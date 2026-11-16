import type { Metadata } from "next";
import "./globals.css";
import { AcademicProvider } from "@/context/AcademicContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Sistema Acadêmico | Fatec",
  description:
    "Aplicação web para consulta e cadastro de alunos, disciplinas e matrículas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="flex min-h-screen flex-col antialiased">
        <AcademicProvider>
          <Header />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
            {children}
          </main>
          <Footer />
        </AcademicProvider>
      </body>
    </html>
  );
}
