"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAcademic } from "@/context/AcademicContext";

export default function NovoAlunoPage() {
  const router = useRouter();
  const { addAluno } = useAcademic();

  const [ra, setRa] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const parsedRa = Number(ra.trim());
    const result = addAluno(parsedRa, name);

    if (!result.ok) {
      setError(result.error ?? "Não foi possível cadastrar o aluno.");
      return;
    }

    router.push("/alunos");
  }

  return (
    <section className="rounded-2xl border border-blue-200 bg-white p-6 shadow-xs">
      <div className="border-b border-blue-100 pb-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Cadastrar Novo Aluno
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Preencha o RA e o nome completo para incluir um novo aluno.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        <div>
          <label
            htmlFor="ra"
            className="block text-sm font-medium text-slate-700"
          >
            RA (Registro Acadêmico)
          </label>
          <input
            id="ra"
            name="ra"
            type="number"
            min={1}
            step={1}
            required
            value={ra}
            onChange={(e) => setRa(e.target.value)}
            placeholder="Ex.: 258004"
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700"
          >
            Nome completo
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Maria Eduarda Pereira"
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2 text-sm text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Cadastrar Aluno
          </button>
          <Link
            href="/alunos"
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Voltar
          </Link>
        </div>
      </form>
    </section>
  );
}
