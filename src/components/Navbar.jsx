import { useState } from 'react';
import { Crown, LogIn, Wallet, Settings, Shield, LogOut, User, IndianRupee } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

function AuthModal({ open, onClose }) {
  const { login, register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const [error, setError] = useState('');

  if (!open) return null;

  const submit = async () => {
    try {
      setError('');
      if (mode === 'login') await login(email, password);
      else await register(email, password);
      onClose();
    } catch (e) {
      setError(e.message || 'Something went wrong');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-gradient-to-b from-zinc-900 to-black p-6 shadow-2xl ring-1 ring-white/10">
        <div className="mb-4 flex items-center gap-2">
          <Shield className="h-5 w-5 text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Secure {mode === 'login' ? 'Sign In' : 'Sign Up'}</h3>
        </div>
        <p className="mb-4 text-sm text-zinc-300">Access games and manage your INR wallet.</p>
        {error && <div className="mb-3 rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-sm text-red-300">{error}</div>}
        <div className="space-y-3">
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="w-full rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full rounded-lg border border-white/10 bg-zinc-900/60 px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          <button onClick={submit} className="w-full rounded-lg bg-emerald-500 px-4 py-2 font-medium text-black transition hover:bg-emerald-400">{mode === 'login' ? 'Sign In' : 'Create Account'}</button>
          <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="w-full rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5">
            {mode === 'login' ? 'New here? Create an account' : 'Have an account? Sign In'}
          </button>
          <button onClick={onClose} className="w-full rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [openAuth, setOpenAuth] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/60 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-lg">
              <Crown className="h-5 w-5 text-black" />
            </div>
            <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-lg font-semibold text-transparent">BlazeBet</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-zinc-300 md:flex">
            <Link to="/games" className="hover:text-white">Games</Link>
            <Link to="/wallet" className="hover:text-white">Wallet</Link>
            {user?.is_admin && <Link to="/admin" className="hover:text-white">Admin</Link>}
          </nav>

          <div className="flex items-center gap-2">
            {user && (
              <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-emerald-300 md:flex">
                <IndianRupee className="h-4 w-4" /> {(user.balance ?? 0).toLocaleString('en-IN')}
              </div>
            )}
            <Link to="/wallet" className="hidden items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-200 hover:bg-white/5 md:flex">
              <Wallet className="h-4 w-4" /> INR Wallet
            </Link>
            {user ? (
              <>
                <div className="hidden items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-200 md:flex">
                  <User className="h-4 w-4" /> {user.email}
                </div>
                <button onClick={() => { logout(); navigate('/'); }} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-200 hover:bg-white/5">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <button onClick={() => setOpenAuth(true)} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 px-3 py-2 text-sm font-medium text-black shadow-lg hover:from-emerald-400 hover:to-cyan-400">
                <LogIn className="h-4 w-4" /> Sign In
              </button>
            )}
            <button className="hidden items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-200 hover:bg-white/5 md:flex">
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>
      <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
    </>
  );
}
