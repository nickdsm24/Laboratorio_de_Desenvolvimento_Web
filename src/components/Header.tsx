import Link from "next/link";
import { MainNav } from "./MainNav";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white shadow-xs">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-slate-900 hover:text-slate-700"
          >
            Sistema Acadêmico
          </Link>
          <p className="text-xs text-slate-500">
            Fatec — Laboratório de Desenvolvimento Web
          </p>
        </div>
        <MainNav />
      </div>
    </header>
  );
}
