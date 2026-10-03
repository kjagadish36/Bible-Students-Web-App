import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/admin-session";
import { cookies } from "next/headers";

// Issues short-lived tokens so the browser can upload book files/covers directly
// to Vercel Blob, bypassing the server's request-body size limit.
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const session = (await cookies()).get(SESSION_COOKIE)?.value;
        if (!session || !verifySessionToken(session)) {
          throw new Error("Not authorized");
        }

        const isImage = /\.(jpg|jpeg|png|webp)$/i.test(pathname);
        return {
          allowedContentTypes: isImage
            ? ["image/jpeg", "image/png", "image/webp"]
            : ["application/pdf", "application/epub+zip"],
          addRandomSuffix: true,
          maximumSizeInBytes: 50 * 1024 * 1024,
        };
      },
      onUploadCompleted: async () => {
        // No DB write needed here; the admin form saves the returned URL itself.
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 400 },
    );
  }
}
