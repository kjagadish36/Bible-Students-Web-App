import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
  // Match all paths except static files, Next internals, API routes, and the admin panel.
  matcher: ["/((?!api|admin|_next|_vercel|.*\\..*).*)"],
};
