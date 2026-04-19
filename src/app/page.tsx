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
    <main className="min-h-screen bg-[#0f0a1e] flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-700/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-pink-700/20 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-6 float-animation inline-block">🎂</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 tracking-tight">
            Aniversário do{" "}
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">
              Victor
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            01 de Maio · Confirme sua presença!
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-white font-semibold text-xl mb-6">
            Confirmar Presença
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Nome completo
              </label>
              <input
                id="name"
                type="text"
                required
                minLength={2}
                maxLength={255}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500/60 transition"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-white/5 border border-white/10 text-white placeholder-gray-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet-500/60 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Vai participar?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setWillAttend(true);
                    setState("idle");
                  }}
                  className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                    willAttend === true
                      ? "bg-violet-600 border-violet-500 text-white"
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-violet-500/40 hover:text-white"
                  }`}
                >
                  🎉 Sim, vou!
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setWillAttend(false);
                    setState("idle");
                  }}
                  className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                    willAttend === false
                      ? "bg-pink-700 border-pink-500 text-white"
                      : "bg-white/5 border-white/10 text-gray-400 hover:border-pink-500/40 hover:text-white"
                  }`}
                >
                  😔 Não consigo
                </button>
              </div>
            </div>

            {(state === "error" || state === "conflict") && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="glow-button mt-1 w-full py-3.5 rounded-xl font-semibold text-white text-sm bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? "Enviando..." : "Confirmar Presença →"}
            </button>
          </form>

          <p className="text-gray-600 text-xs text-center mt-5">
            Você receberá um email de confirmação e lembretes antes do evento.
          </p>
        </div>
      </div>
    </main>
  );
}
