import { AlunosSidebar } from "@/components/AlunosSidebar";

export default function AlunosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5 text-white shadow-xs">
        <p className="text-xs font-semibold tracking-wider text-blue-100 uppercase">
          Área Acadêmica • Azul
        </p>
        <h1 className="mt-1 text-2xl font-bold">Gestão de Alunos</h1>
        <p className="mt-1 text-sm text-blue-100">
          Consulte registros, visualize detalhes por RA e cadastre novos alunos.
        </p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        <AlunosSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
