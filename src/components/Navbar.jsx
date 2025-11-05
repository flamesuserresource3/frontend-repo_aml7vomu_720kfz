import { useState } from 'react';
import { Crown, LogIn, Wallet, Settings, Shield } from 'lucide-react';

function AuthModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-zinc-900 to-black p-6 shadow-2xl ring-1 ring-white/10">
        <div className="mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Secure Sign In</h3>
        </div>
        <p className="mb-4 text-sm text-zinc-300">
          Continue to your account to play games, manage your wallet, and access bonuses.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-emerald-500 px-4 py-2 font-medium text-black transition hover:bg-emerald-400"
          >
            Sign In
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [openAuth, setOpenAuth] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/60 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg">
              <Crown className="h-5 w-5 text-black" />
            </div>
            <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-lg font-semibold text-transparent">
              BlazeBet
            </span>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            <a href="#games" className="hover:text-white">Games</a>
            <a href="#wallet" className="hover:text-white">Wallet</a>
            <a href="#security" className="hover:text-white">Security</a>
          </nav>

          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-200 hover:bg-white/5 md:flex">
              <Wallet className="h-4 w-4" /> INR Wallet
            </button>
            <button className="hidden items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-200 hover:bg-white/5 md:flex">
              <Settings className="h-4 w-4" />
            </button>
            <button
              onClick={() => setOpenAuth(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 px-3 py-2 text-sm font-medium text-black shadow-lg hover:from-emerald-400 hover:to-cyan-400"
            >
              <LogIn className="h-4 w-4" /> Sign In
            </button>
          </div>
        </div>
      </header>
      <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
    </>
  );
}
