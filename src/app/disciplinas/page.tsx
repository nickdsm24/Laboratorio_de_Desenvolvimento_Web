import { disciplinas } from "@/data/disciplinas";

export default function DisciplinasPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-5 text-white shadow-xs">
        <p className="text-xs font-semibold tracking-wider text-emerald-100 uppercase">
          Área Acadêmica • Verde
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold">Catálogo de Disciplinas</h1>
          <span className="rounded-full bg-white/20 px-3.5 py-1 text-sm font-semibold">
            Total: {disciplinas.length} disciplinas
          </span>
        </div>
        <p className="mt-1 text-sm text-emerald-100">
          Catálogo fixo com todas as disciplinas ofertadas pelo curso.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {disciplinas.map((disciplina) => (
          <article
            key={disciplina.id}
            className="flex flex-col justify-between rounded-2xl border border-emerald-200 bg-white p-5 shadow-xs transition-colors hover:border-emerald-400"
          >
            <div>
              <span className="inline-block rounded-md bg-emerald-100 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-800">
                ID #{disciplina.id}
              </span>
              <h2 className="mt-3 text-base font-semibold text-slate-900">
                {disciplina.name}
              </h2>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
