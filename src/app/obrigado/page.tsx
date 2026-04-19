"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ThankYouContent() {
  const params = useSearchParams();
  const name = params.get("name") ?? "Pessoa";
  const attending = params.get("attending") === "true";

  return (
    <main className="min-h-screen bg-[#f5f0e8] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <div className="text-7xl mb-6 inline-block">
          {attending ? "" : "💚"}
        </div>

        <p className="text-gray-700 text-lg mb-2">
          {attending
            ? `${name.split(" ")[0]}, mal posso esperar te ver!`
            : `${name.split(" ")[0]}, que pena que não vai conseguir.`}
        </p>

        <p className="text-gray-400 text-base mb-10">
          {attending
            ? "Você vai receber lembretes por email"
            : "Obrigado por ter respondido. Guardei seus dados para caso as coisas mudem!"}
        </p>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 text-left">
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">
            Detalhes do evento
          </p>
          <div className="flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-gray-900 font-semibold">01 de Maio de 2026</p>
              <p className="text-gray-400 text-sm">Aniversário do Victor</p>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#8a9a7b] hover:text-[#6a7a5b] transition"
        >
          ← Voltar para o início
        </Link>
      </div>
    </main>
  );
}

export default function ThanksPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
