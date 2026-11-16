"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  {
    href: "/",
    label: "Início",
    match: (pathname: string) => pathname === "/",
    activeClass: "bg-slate-800 text-white",
    hoverClass: "hover:bg-slate-100 hover:text-slate-900",
  },
  {
    href: "/alunos",
    label: "Alunos",
    match: (pathname: string) => pathname.startsWith("/alunos"),
    activeClass: "bg-blue-600 text-white shadow-sm",
    hoverClass: "hover:bg-blue-50 hover:text-blue-700",
  },
  {
    href: "/disciplinas",
    label: "Disciplinas",
    match: (pathname: string) => pathname.startsWith("/disciplinas"),
    activeClass: "bg-emerald-600 text-white shadow-sm",
    hoverClass: "hover:bg-emerald-50 hover:text-emerald-700",
  },
  {
    href: "/matriculas",
    label: "Matrículas",
    match: (pathname: string) => pathname.startsWith("/matriculas"),
    activeClass: "bg-orange-600 text-white shadow-sm",
    hoverClass: "hover:bg-orange-50 hover:text-orange-700",
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navegação principal" className="flex flex-wrap gap-2">
      {navItems.map((item) => {
        const isActive = item.match(pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? item.activeClass
                : `text-slate-700 ${item.hoverClass}`
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
