"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ThankYouContent() {
  const params = useSearchParams();
  const name = params.get("name") ?? "Pessoa";
  const attending = params.get("attending") === "true";

  return (
    <main className="min-h-screen bg-[#0f0a1e] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-pink-700/20 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg text-center">
        <div className="text-7xl mb-6 float-animation inline-block">
          {attending ? "🥳" : "💜"}
        </div>

        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
          {attending ? "Incrível!" : "Tudo bem!"}
        </h1>

        <p className="text-gray-300 text-lg mb-2">
          {attending
            ? `${name.split(" ")[0]}, mal posso esperar te ver!`
            : `${name.split(" ")[0]}, que pena que não vai conseguir.`}
        </p>

        <p className="text-gray-500 text-base mb-10">
          {attending
            ? "Você vai receber lembretes por email faltando 7 dias, 3 dias e no dia do evento."
            : "Obrigado por ter respondido. Guardei seus dados para caso as coisas mudem!"}
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">
            Detalhes do evento
          </p>
          <div className="flex items-center gap-3">
            <span className="text-2xl">📅</span>
            <div>
              <p className="text-white font-semibold">01 de Maio de 2026</p>
              <p className="text-gray-500 text-sm">Aniversário do Victor</p>
            </div>
          </div>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-violet-400 hover:text-violet-300 transition"
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
