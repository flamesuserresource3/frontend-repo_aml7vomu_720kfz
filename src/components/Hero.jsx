import Spline from '@splinetool/react-spline';
import { Rocket, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/5r2f3m0UeA0oM-5E/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 pb-24 pt-24 text-center md:pb-32 md:pt-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-emerald-300">
          <Sparkles className="h-3.5 w-3.5" /> Real-time, mobile-first experience
        </div>
        <h1 className="bg-gradient-to-br from-white to-zinc-300 bg-clip-text text-4xl font-extrabold leading-tight text-transparent md:text-6xl">
          India’s sleek gaming hub for Mines, Aviator, Color & Coin Flip
        </h1>
        <p className="max-w-2xl text-sm text-zinc-300 md:text-base">
          Play beautiful, fast games with a fair-play ethos and responsible gaming guardrails. INR wallet, quick deposits, and a polished experience.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <a href="#games" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 px-5 py-3 font-medium text-black shadow-lg transition hover:from-emerald-400 hover:to-cyan-400">
            <Rocket className="h-5 w-5" /> Start Playing
          </a>
          <a href="#wallet" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 font-medium text-white hover:bg-white/10">
            View Wallet
          </a>
        </div>
      </div>
    </section>
  );
}
