"use client";

import Link from "next/link";
import { useAcademic } from "@/context/AcademicContext";

export default function AlunosPage() {
  const { alunos, storageError } = useAcademic();

  return (
    <section className="rounded-2xl border border-blue-200 bg-white p-6 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-blue-100 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">
            Alunos Cadastrados
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Total de registros:{" "}
            <span className="font-semibold text-blue-700">{alunos.length}</span>
          </p>
        </div>
        <Link
          href="/alunos/novo"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          + Cadastrar Aluno
        </Link>
      </div>

      {storageError && (
        <div
          role="alert"
          className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800"
        >
          {storageError}
        </div>
      )}

      {alunos.length === 0 ? (
        <p className="mt-6 text-sm text-slate-500">
          Nenhum aluno cadastrado no momento.
        </p>
      ) : (
        <ul className="mt-4 divide-y divide-blue-100">
          {alunos.map((aluno) => (
            <li
              key={aluno.ra}
              className="flex flex-col justify-between gap-3 py-4 sm:flex-row sm:items-center"
            >
              <div>
                <p className="font-medium text-slate-900">{aluno.name}</p>
                <p className="text-sm text-slate-500">
                  RA:{" "}
                  <span className="font-mono font-medium text-blue-700">
                    {aluno.ra}
                  </span>
                </p>
              </div>
              <Link
                href={`/alunos/${aluno.ra}`}
                className="inline-flex items-center justify-center rounded-lg border border-blue-200 bg-blue-50 px-3.5 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
              >
                Ver detalhes
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
