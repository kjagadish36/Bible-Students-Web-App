"use client";

import { useActionState } from "react";
import { login } from "@/app/admin/actions";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, { error: "" });

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-950 px-4">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-2xl border border-white/10 bg-white p-8 shadow-xl"
      >
        <h1 className="font-serif text-xl font-semibold text-brand-900">Admin Login</h1>
        <p className="mt-1 text-sm text-brand-800/60">
          Manage services, cottage meetings, announcements and books.
        </p>

        <label className="mt-6 block text-sm font-medium text-brand-900">
          Password
          <input
            type="password"
            name="password"
            required
            autoFocus
            className="mt-1 w-full rounded-lg border border-brand-900/15 px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
          />
        </label>

        {state?.error && (
          <p className="mt-3 text-sm font-medium text-red-600">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-5 w-full rounded-full bg-gold-500 px-4 py-2.5 text-sm font-semibold text-brand-950 transition hover:bg-gold-400 disabled:opacity-60"
        >
          {pending ? "Checking..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
