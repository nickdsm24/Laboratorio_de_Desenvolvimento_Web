"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAcademic } from "@/context/AcademicContext";

export default function NovaMatriculaPage() {
  const router = useRouter();
  const { alunos, disciplinas, addMatricula } = useAcademic();

  const [studentRa, setStudentRa] = useState("");
  const [courseId, setCourseId] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!studentRa) {
      setError("Selecione um aluno.");
      return;
    }

    if (!courseId) {
      setError("Selecione uma disciplina.");
      return;
    }

    const result = addMatricula(Number(studentRa), Number(courseId));

    if (!result.ok) {
      setError(result.error ?? "Não foi possível cadastrar a matrícula.");
      return;
    }

    router.push("/matriculas");
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-orange-200 bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-5 text-white shadow-xs">
        <p className="text-xs font-semibold tracking-wider text-orange-100 uppercase">
          Área Acadêmica • Laranja
        </p>
        <h1 className="mt-1 text-2xl font-bold">Nova Matrícula</h1>
        <p className="mt-1 text-sm text-orange-100">
          Vincule um aluno cadastrado a uma disciplina do curso.
        </p>
      </div>

      <section className="mx-auto max-w-2xl rounded-2xl border border-orange-200 bg-white p-6 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
              htmlFor="student"
              className="block text-sm font-medium text-slate-700"
            >
              Aluno
            </label>
            <select
              id="student"
              name="student"
              value={studentRa}
              onChange={(e) => setStudentRa(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
            >
              <option value="">Selecione um aluno...</option>
              {alunos.map((aluno) => (
                <option key={aluno.ra} value={aluno.ra}>
                  {aluno.ra} — {aluno.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="course"
              className="block text-sm font-medium text-slate-700"
            >
              Disciplina
            </label>
            <select
              id="course"
              name="course"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none"
            >
              <option value="">Selecione uma disciplina...</option>
              {disciplinas.map((disciplina) => (
                <option key={disciplina.id} value={disciplina.id}>
                  {disciplina.id} — {disciplina.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-orange-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-700"
            >
              Cadastrar Matrícula
            </button>
            <Link
              href="/matriculas"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Voltar
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
