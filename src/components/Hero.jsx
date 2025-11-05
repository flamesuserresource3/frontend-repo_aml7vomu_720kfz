import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero({ onGetStartedScrollTo = '#wallet' }) {
  const handleClick = (e) => {
    e.preventDefault();
    const el = document.querySelector(onGetStartedScrollTo);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-b-3xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/6R8f0JcQb6L2b6Qx/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-slate-950" />

      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-white/80 backdrop-blur">
            Made for India • INR Wallet • Fast Withdrawals
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Play. Predict. Win.
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-emerald-300">DesiBet</span>
          </h1>
          <p className="text-white/80 text-base md:text-lg">
            Four thrilling games. Secure INR deposits. Real-time balance updates. Built with React, Tailwind, and Spline.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href={onGetStartedScrollTo}
              onClick={handleClick}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-fuchsia-500 to-rose-500 px-5 py-3 text-sm font-semibold shadow hover:from-fuchsia-400 hover:to-rose-400 transition-colors"
            >
              <Rocket size={18} /> Get Started
            </a>
            <a
              href="#games"
              className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              Explore Games
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
