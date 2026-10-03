"use client";

import { useState } from "react";
import { upload } from "@vercel/blob/client";

// Uploads directly from the browser to Vercel Blob (bypasses the server's request
// body size limit), then fills the paired URL field with the resulting address.
export function BlobUploadField({
  label,
  name,
  accept,
  hint,
  defaultValue,
}: {
  label: string;
  name: string;
  accept: string;
  hint?: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setStatus("uploading");
    setErrorMessage("");
    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/books/upload",
      });
      setUrl(blob.url);
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Upload failed");
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-brand-900">
        {label}
        <input
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-brand-800 file:mr-3 file:rounded-full file:border-0 file:bg-gold-100 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gold-700 hover:file:bg-gold-200"
        />
        {hint && <span className="mt-1 block text-xs font-normal text-brand-800/50">{hint}</span>}
      </label>

      {status === "uploading" && <p className="text-xs font-medium text-gold-700">Uploading…</p>}
      {status === "error" && <p className="text-xs font-medium text-red-600">{errorMessage}</p>}

      <label className="block text-sm font-medium text-brand-900">
        Or paste a URL directly
        <input
          type="text"
          name={name}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-1 w-full rounded-lg border border-brand-900/15 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
        />
      </label>
    </div>
  );
}
