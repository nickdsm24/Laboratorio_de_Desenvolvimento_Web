"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { alunos as initialAlunos, type Aluno } from "@/data/alunos";
import {
  matriculas as initialMatriculas,
  type Matricula,
} from "@/data/matriculas";
import { disciplinas, type Disciplina } from "@/data/disciplinas";

const ALUNOS_STORAGE_KEY = "fatec_web_alunos_v1";
const MATRICULAS_STORAGE_KEY = "fatec_web_matriculas_v1";

type ActionResult = {
  ok: boolean;
  error?: string;
};

type AcademicContextType = {
  alunos: Aluno[];
  disciplinas: Disciplina[];
  matriculas: Matricula[];
  isLoaded: boolean;
  storageError: string | null;
  addAluno: (ra: number, name: string) => ActionResult;
  addMatricula: (studentRa: number, courseId: number) => ActionResult;
};

const AcademicContext = createContext<AcademicContextType | undefined>(
  undefined
);

function persistToStorage(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function AcademicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [alunos, setAlunos] = useState<Aluno[]>(initialAlunos);
  const [matriculas, setMatriculas] = useState<Matricula[]>(initialMatriculas);
  const [isLoaded, setIsLoaded] = useState(false);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedAlunos = window.localStorage.getItem(ALUNOS_STORAGE_KEY);
      if (savedAlunos !== null) {
        const parsedAlunos = JSON.parse(savedAlunos);
        if (Array.isArray(parsedAlunos)) {
          setAlunos(parsedAlunos);
        }
      } else {
        const ok = persistToStorage(ALUNOS_STORAGE_KEY, initialAlunos);
        if (!ok) {
          setStorageError(
            "Não foi possível inicializar os dados de alunos no navegador."
          );
        }
      }

      const savedMatriculas = window.localStorage.getItem(
        MATRICULAS_STORAGE_KEY
      );
      if (savedMatriculas !== null) {
        const parsedMatriculas = JSON.parse(savedMatriculas);
        if (Array.isArray(parsedMatriculas)) {
          setMatriculas(parsedMatriculas);
        }
      } else {
        const ok = persistToStorage(MATRICULAS_STORAGE_KEY, initialMatriculas);
        if (!ok) {
          setStorageError(
            "Não foi possível inicializar os dados de matrículas no navegador."
          );
        }
      }
    } catch {
      setStorageError(
        "Erro ao acessar o armazenamento local do navegador. Usando dados iniciais em memória."
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const addAluno = useCallback(
    (ra: number, name: string): ActionResult => {
      const trimmedName = name.trim();

      if (!Number.isInteger(ra) || ra <= 0) {
        return {
          ok: false,
          error: "Informe um RA numérico inteiro e positivo.",
        };
      }

      if (!trimmedName) {
        return {
          ok: false,
          error: "Informe o nome completo do aluno.",
        };
      }

      if (alunos.some((aluno) => aluno.ra === ra)) {
        return {
          ok: false,
          error: `Já existe um aluno cadastrado com o RA ${ra}.`,
        };
      }

      const updatedAlunos: Aluno[] = [...alunos, { ra, name: trimmedName }];
      const saved = persistToStorage(ALUNOS_STORAGE_KEY, updatedAlunos);

      if (!saved) {
        return {
          ok: false,
          error:
            "Falha ao salvar o aluno no armazenamento do navegador. O cadastro não foi concluído.",
        };
      }

      setAlunos(updatedAlunos);
      return { ok: true };
    },
    [alunos]
  );

  const addMatricula = useCallback(
    (studentRa: number, courseId: number): ActionResult => {
      const alunoExiste = alunos.some((aluno) => aluno.ra === studentRa);
      if (!alunoExiste) {
        return {
          ok: false,
          error: "Selecione um aluno válido.",
        };
      }

      const disciplinaExiste = disciplinas.some((disc) => disc.id === courseId);
      if (!disciplinaExiste) {
        return {
          ok: false,
          error: "Selecione uma disciplina válida.",
        };
      }

      const duplicada = matriculas.some(
        (m) => m.student_ra === studentRa && m.course_id === courseId
      );
      if (duplicada) {
        return {
          ok: false,
          error: "Este aluno já está matriculado na disciplina selecionada.",
        };
      }

      const updatedMatriculas: Matricula[] = [
        ...matriculas,
        { student_ra: studentRa, course_id: courseId },
      ];
      const saved = persistToStorage(MATRICULAS_STORAGE_KEY, updatedMatriculas);

      if (!saved) {
        return {
          ok: false,
          error:
            "Falha ao salvar a matrícula no armazenamento do navegador. O cadastro não foi concluído.",
        };
      }

      setMatriculas(updatedMatriculas);
      return { ok: true };
    },
    [alunos, matriculas]
  );

  return (
    <AcademicContext.Provider
      value={{
        alunos,
        disciplinas,
        matriculas,
        isLoaded,
        storageError,
        addAluno,
        addMatricula,
      }}
    >
      {children}
    </AcademicContext.Provider>
  );
}

export function useAcademic(): AcademicContextType {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error(
      "useAcademic deve ser utilizado dentro de um AcademicProvider."
    );
  }
  return context;
}
