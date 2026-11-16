"use client";

import Link from "next/link";
import { useAcademic } from "@/context/AcademicContext";

export default function MatriculasPage() {
  const { alunos, disciplinas, matriculas, storageError } = useAcademic();

  const alunosMap = new Map(alunos.map((a) => [a.ra, a.name]));
  const disciplinasMap = new Map(disciplinas.map((d) => [d.id, d.name]));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 text-white shadow-xs">
        <p className="text-xs font-semibold tracking-wider text-orange-100 uppercase">
          Área Acadêmica • Laranja
        </p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Gestão de Matrículas</h1>
            <p className="mt-1 text-sm text-orange-100">
              Total de matrículas registradas:{" "}
              <span className="font-semibold text-white">
                {matriculas.length}
              </span>
            </p>
          </div>
          <Link
            href="/matriculas/nova"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-orange-700 shadow-xs transition-colors hover:bg-orange-50"
          >
            + Nova Matrícula
          </Link>
        </div>
      </div>

      {storageError && (
        <div
          role="alert"
          className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800"
        >
          {storageError}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl border border-orange-200 bg-white shadow-xs">
        {matriculas.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-600">
              Nenhuma matrícula cadastrada até o momento.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="border-b border-orange-200 bg-orange-50 text-xs font-semibold tracking-wider text-orange-900 uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3.5">
                    RA
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Nome do Aluno
                  </th>
                  <th scope="col" className="px-6 py-3.5">
                    Disciplina
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100">
                {matriculas.map((matricula) => {
                  const nomeAluno =
                    alunosMap.get(matricula.student_ra) ??
                    "Aluno não encontrado";
                  const nomeDisciplina =
                    disciplinasMap.get(matricula.course_id) ??
                    "Disciplina não encontrada";

                  return (
                    <tr
                      key={`${matricula.student_ra}-${matricula.course_id}`}
                      className="transition-colors hover:bg-orange-50/40"
                    >
                      <td className="px-6 py-3.5 font-mono font-medium text-orange-700">
                        {matricula.student_ra}
                      </td>
                      <td className="px-6 py-3.5 font-medium text-slate-900">
                        {nomeAluno}
                      </td>
                      <td className="px-6 py-3.5 text-slate-700">
                        {nomeDisciplina}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
