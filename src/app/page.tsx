import Link from "next/link";

const areas = [
  {
    title: "Gestão de Alunos",
    description:
      "Consulte os alunos cadastrados, visualize detalhes individuais por RA e realize novos cadastros.",
    href: "/alunos",
    actionLabel: "Acessar Alunos",
    borderClass: "border-blue-200 hover:border-blue-400",
    badgeClass: "bg-blue-100 text-blue-800",
    buttonClass: "bg-blue-600 hover:bg-blue-700 text-white",
    tag: "Tema Azul • Menu Lateral + Lista",
  },
  {
    title: "Catálogo de Disciplinas",
    description:
      "Consulte as 39 disciplinas fixas do curso com seus códigos identificadores e nomes.",
    href: "/disciplinas",
    actionLabel: "Acessar Disciplinas",
    borderClass: "border-emerald-200 hover:border-emerald-400",
    badgeClass: "bg-emerald-100 text-emerald-800",
    buttonClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
    tag: "Tema Verde • Cartões",
  },
  {
    title: "Gestão de Matrículas",
    description:
      "Consulte em tabela os vínculos entre alunos e disciplinas e cadastre novas matrículas sem duplicidade.",
    href: "/matriculas",
    actionLabel: "Acessar Matrículas",
    borderClass: "border-orange-200 hover:border-orange-400",
    badgeClass: "bg-orange-100 text-orange-800",
    buttonClass: "bg-orange-600 hover:bg-orange-700 text-white",
    tag: "Tema Laranja • Tabela",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xs">
        <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700 uppercase">
          Página Inicial
        </span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
          Sistema de Gestão Acadêmica
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-600">
          Esta aplicação tem como objetivo centralizar a consulta e o cadastro
          de <strong>alunos</strong> e <strong>matrículas</strong>, além de
          disponibilizar a consulta ao catálogo fixo de{" "}
          <strong>disciplinas</strong> do curso. Utilize o menu superior ou os
          atalhos abaixo para navegar entre as áreas do sistema.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {areas.map((area) => (
          <article
            key={area.href}
            className={`flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-xs transition-colors ${area.borderClass}`}
          >
            <div>
              <span
                className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${area.badgeClass}`}
              >
                {area.tag}
              </span>
              <h2 className="mt-4 text-xl font-semibold text-slate-900">
                {area.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {area.description}
              </p>
            </div>
            <div className="mt-6">
              <Link
                href={area.href}
                className={`inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${area.buttonClass}`}
              >
                {area.actionLabel}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
