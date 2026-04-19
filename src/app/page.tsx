"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type FormState = "idle" | "loading" | "error" | "conflict";

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [willAttend, setWillAttend] = useState<boolean | null>(null);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (willAttend === null) {
      setErrorMsg("Selecione se vai participar ou não.");
      setState("error");
      return;
    }

    setState("loading");

    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, willAttend }),
    });

    if (res.ok) {
      router.push(`/obrigado?name=${encodeURIComponent(name)}&attending=${willAttend}`);
      return;
    }

    if (res.status === 409) {
      setState("conflict");
      setErrorMsg("Este email já foi confirmado anteriormente.");
      return;
    }

    const data = await res.json().catch(() => ({}));
    setErrorMsg(data?.error ?? "Algo deu errado. Tente novamente.");
    setState("error");
  }

  const isLoading = state === "loading";

  return (
    <main className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-white rounded-2xl p-10 shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Formulário de Confirmação
          </h1>
          <p className="text-gray-500 text-sm">
            Confirme sua presença no aniversário de Victor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              Nome
            </label>
            <input
              id="name"
              type="text"
              required
              minLength={2}
              maxLength={255}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#f5f0e8] border-none rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8a9a7b]/40 transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 mb-1.5"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f5f0e8] border-none rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8a9a7b]/40 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Você comparecerá?
            </label>
            <div className="grid grid-cols-2 gap-0 border border-gray-200 rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  setWillAttend(true);
                  setState("idle");
                }}
                className={`py-3 text-sm font-medium cursor-pointer transition-all ${
                  willAttend === true
                    ? "bg-[#e8e0d4] text-gray-900"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                Sim
              </button>
              <button
                type="button"
                onClick={() => {
                  setWillAttend(false);
                  setState("idle");
                }}
                className={`py-3 text-sm font-medium border-l border-gray-200 cursor-pointer transition-all ${
                  willAttend === false
                    ? "bg-[#e8e0d4] text-gray-900"
                    : "bg-white text-gray-500 hover:bg-gray-50"
                }`}
              >
                Não
              </button>
            </div>
          </div>

          {(state === "error" || state === "conflict") && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-lg font-semibold text-white text-sm bg-[#8a9a7b] hover:bg-[#7a8a6b] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </main>
  );
}
