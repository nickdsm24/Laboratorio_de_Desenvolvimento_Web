"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useAcademic } from "@/context/AcademicContext";

export default function AlunoDetalhesPage() {
  const params = useParams<{ ra: string }>();
  const { alunos, matriculas, disciplinas } = useAcademic();

  const raNumber = Number(params.ra);
  const aluno = Number.isInteger(raNumber)
    ? alunos.find((item) => item.ra === raNumber)
    : undefined;

  if (!aluno) {
    return (
      <section className="rounded-2xl border border-blue-200 bg-white p-6 shadow-xs">
        <h2 className="text-xl font-semibold text-slate-900">
          Aluno não encontrado
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Não foi possível localizar nenhum aluno com o RA{" "}
          <span className="font-mono font-semibold text-slate-800">
            {params.ra}
          </span>
          .
        </p>
        <div className="mt-6">
          <Link
            href="/alunos"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Voltar para a listagem
          </Link>
        </div>
      </section>
    );
  }

  const disciplinasDoAluno = matriculas
    .filter((m) => m.student_ra === aluno.ra)
    .map((m) => disciplinas.find((d) => d.id === m.course_id))
    .filter((d): d is NonNullable<typeof d> => d !== undefined);

  return (
    <section className="rounded-2xl border border-blue-200 bg-white p-6 shadow-xs">
      <div className="border-b border-blue-100 pb-4">
        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
          Detalhes do Aluno
        </span>
        <h2 className="mt-3 text-2xl font-bold text-slate-900">{aluno.name}</h2>
        <p className="mt-1 text-sm text-slate-600">
          Registro Acadêmico (RA):{" "}
          <span className="font-mono font-semibold text-blue-700">
            {aluno.ra}
          </span>
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-semibold tracking-wide text-slate-700 uppercase">
          Disciplinas Matriculadas ({disciplinasDoAluno.length})
        </h3>
        {disciplinasDoAluno.length === 0 ? (
          <p className="mt-2 text-sm text-slate-500">
            Este aluno ainda não possui matrículas registradas.
          </p>
        ) : (
          <ul className="mt-3 divide-y divide-blue-100 rounded-xl border border-blue-100 bg-blue-50/40">
            {disciplinasDoAluno.map((disciplina) => (
              <li
                key={disciplina.id}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
              >
                <span className="font-medium text-slate-800">
                  {disciplina.name}
                </span>
                <span className="font-mono text-xs text-blue-700">
                  ID {disciplina.id}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 border-t border-blue-100 pt-4">
        <Link
          href="/alunos"
          className="inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
        >
          ← Voltar para a listagem
        </Link>
      </div>
    </section>
  );
}
