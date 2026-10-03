import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/admin-session";
import { logout } from "@/app/admin/actions";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isAuthed = verifySessionToken(cookieStore.get(SESSION_COOKIE)?.value);

  if (!isAuthed) {
    redirect("/admin/login");
  }

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/services", label: "Services" },
    { href: "/admin/cottage-meetings", label: "Cottage Meetings" },
    { href: "/admin/announcements", label: "Announcements" },
    { href: "/admin/books", label: "Books" },
  ];

  return (
    <div>
      <header className="border-b border-brand-900/10 bg-brand-950 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-brand-100/80">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-gold-400">
                {link.label}
              </a>
            ))}
          </nav>
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-1.5 text-sm font-medium text-brand-100/80 hover:text-gold-400"
            >
              <LogOut size={16} />
              Log out
            </button>
          </form>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">{children}</main>
    </div>
  );
}
