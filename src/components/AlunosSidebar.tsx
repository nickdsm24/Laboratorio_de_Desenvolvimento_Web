"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  {
    href: "/alunos",
    label: "Consultar Alunos",
    isActive: (pathname: string) =>
      pathname === "/alunos" ||
      (pathname.startsWith("/alunos/") && pathname !== "/alunos/novo"),
  },
  {
    href: "/alunos/novo",
    label: "Cadastrar Aluno",
    isActive: (pathname: string) => pathname === "/alunos/novo",
  },
];

export function AlunosSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full shrink-0 md:w-64">
      <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4">
        <h2 className="px-3 text-xs font-semibold tracking-wider text-blue-800 uppercase">
          Menu de Alunos
        </h2>
        <nav aria-label="Navegação de alunos" className="mt-3 flex flex-col gap-1.5">
          {sidebarLinks.map((item) => {
            const active = item.isActive(pathname);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-blue-900 hover:bg-blue-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
