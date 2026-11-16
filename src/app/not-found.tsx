import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xs">
      <p className="text-sm font-semibold tracking-wider text-slate-500 uppercase">
        Erro 404
      </p>
      <h1 className="mt-2 text-2xl font-bold text-slate-900">
        Endereço não encontrado
      </h1>
      <p className="mt-3 text-sm text-slate-600">
        A rota que você tentou acessar não existe ou foi movida.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-slate-800 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700"
        >
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}
