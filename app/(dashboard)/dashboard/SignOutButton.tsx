"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
      aria-label="Tancar sessió"
    >
      <LogOut className="w-4 h-4" aria-hidden />
      <span className="hidden sm:inline">Sortir</span>
    </button>
  );
}
