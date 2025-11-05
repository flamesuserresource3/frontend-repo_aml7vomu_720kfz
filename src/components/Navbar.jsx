import React from 'react';
import { Wallet, Gamepad2, Shield, Home, LogIn } from 'lucide-react';

export default function Navbar({ balance = 0 }) {
  const inr = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(balance || 0);

  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 bg-slate-950/80 border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-fuchsia-500 to-rose-500 text-white">₹</span>
          <span className="text-lg">DesiBet</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <a href="#home" className="hover:text-white inline-flex items-center gap-2 transition-colors"><Home size={18} /> Home</a>
          <a href="#games" className="hover:text-white inline-flex items-center gap-2 transition-colors"><Gamepad2 size={18} /> Games</a>
          <a href="#wallet" className="hover:text-white inline-flex items-center gap-2 transition-colors"><Wallet size={18} /> Wallet</a>
          <a href="#admin" className="hover:text-white inline-flex items-center gap-2 transition-colors"><Shield size={18} /> Admin</a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 bg-white/5">
            <Wallet size={16} className="text-emerald-300" />
            <span className="text-xs text-white/70">Balance</span>
            <span className="font-semibold text-emerald-300">{inr}</span>
          </div>
          <a href="#wallet" className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 px-3 py-2 text-sm font-medium text-white shadow hover:from-emerald-400 hover:to-teal-400 transition-colors">
            <LogIn size={16} /> Sign in
          </a>
        </div>
      </div>
    </header>
  );
}
