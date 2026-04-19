"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ConfirmedContent() {
  const params = useSearchParams();
  const name = params.get("name") ?? "Pessoa";

  return (
    <main className="min-h-screen bg-[#f5f0e8] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <div className="text-7xl mb-6 inline-block">🎉</div>

        <p className="text-gray-700 text-lg mb-2">
          {name.split(" ")[0]}, sua presença no dia foi confirmada!
        </p>

        <p className="text-gray-400 text-base mb-10">
          Obrigado por confirmar. Nos vemos em breve!
        </p>

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

export default function ConfirmedPage() {
  return (
    <Suspense>
      <ConfirmedContent />
    </Suspense>
  );
}
