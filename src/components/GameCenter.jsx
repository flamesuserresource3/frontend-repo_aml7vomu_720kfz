import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coins, Dice5, Gauge, Bomb, Palette, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from './AuthProvider';

function ResultBanner({ status, message }) {
  if (!message) return null;
  const ok = status === 'success';
  return (
    <div className={`mt-3 rounded-lg border p-3 text-sm ${ok ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300' : 'border-red-500/30 bg-red-500/10 text-red-300'}`}>
      {ok ? <CheckCircle2 className="mr-2 inline h-4 w-4" /> : <XCircle className="mr-2 inline h-4 w-4" />} {message}
    </div>
  );
}

function BetCard({ title, icon, children }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.5 }} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

export default function GameCenter() {
  const { backend, token } = useAuth();

  // Coin Flip
  const [coinAmount, setCoinAmount] = useState('');
  const [coinChoice, setCoinChoice] = useState('heads');
  const [coinBusy, setCoinBusy] = useState(false);
  const [coinMsg, setCoinMsg] = useState({ status: '', text: '' });

  const playCoin = async () => {
    if (!token) return setCoinMsg({ status: 'error', text: 'Sign in to play.' });
    if (!coinAmount) return setCoinMsg({ status: 'error', text: 'Enter amount.' });
    setCoinBusy(true);
    setCoinMsg({ status: '', text: '' });
    try {
      const res = await fetch(`${backend}/games/coinflip`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: Number(coinAmount), choice: coinChoice }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Bet failed');
      const win = data?.result?.win ?? data?.win ?? false;
      const payout = data?.result?.payout ?? data?.payout ?? 0;
      setCoinMsg({ status: 'success', text: win ? `You won ₹${payout}` : 'You lost this round.' });
    } catch (e) {
      setCoinMsg({ status: 'error', text: e.message || 'Something went wrong' });
    } finally {
      setCoinBusy(false);
    }
  };

  // Color Prediction
  const [colorAmount, setColorAmount] = useState('');
  const [colorPick, setColorPick] = useState('red');
  const [colorBusy, setColorBusy] = useState(false);
  const [colorMsg, setColorMsg] = useState({ status: '', text: '' });

  const playColor = async () => {
    if (!token) return setColorMsg({ status: 'error', text: 'Sign in to play.' });
    if (!colorAmount) return setColorMsg({ status: 'error', text: 'Enter amount.' });
    setColorBusy(true);
    setColorMsg({ status: '', text: '' });
    try {
      const res = await fetch(`${backend}/games/color`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: Number(colorAmount), choice: colorPick }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Bet failed');
      const win = data?.result?.win ?? data?.win ?? false;
      const payout = data?.result?.payout ?? data?.payout ?? 0;
      setColorMsg({ status: 'success', text: win ? `You won ₹${payout}` : 'You lost this round.' });
    } catch (e) {
      setColorMsg({ status: 'error', text: e.message || 'Something went wrong' });
    } finally {
      setColorBusy(false);
    }
  };

  // Aviator (simple: place bet and see multiplier result)
  const [aviAmount, setAviAmount] = useState('');
  const [aviBusy, setAviBusy] = useState(false);
  const [aviMsg, setAviMsg] = useState({ status: '', text: '' });

  const playAviator = async () => {
    if (!token) return setAviMsg({ status: 'error', text: 'Sign in to play.' });
    if (!aviAmount) return setAviMsg({ status: 'error', text: 'Enter amount.' });
    setAviBusy(true);
    setAviMsg({ status: '', text: '' });
    try {
      const res = await fetch(`${backend}/games/aviator`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: Number(aviAmount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Bet failed');
      const win = data?.result?.win ?? data?.win ?? false;
      const payout = data?.result?.payout ?? data?.payout ?? 0;
      const mult = data?.result?.multiplier ?? data?.multiplier ?? 0;
      setAviMsg({ status: 'success', text: win ? `Cashed out at ${mult}x and won ₹${payout}` : `Plane flew away at ${mult}x. You lost.` });
    } catch (e) {
      setAviMsg({ status: 'error', text: e.message || 'Something went wrong' });
    } finally {
      setAviBusy(false);
    }
  };

  // Mines (simple: pick difficulty only)
  const [minesAmount, setMinesAmount] = useState('');
  const [minesCount, setMinesCount] = useState(5);
  const [minesBusy, setMinesBusy] = useState(false);
  const [minesMsg, setMinesMsg] = useState({ status: '', text: '' });

  const playMines = async () => {
    if (!token) return setMinesMsg({ status: 'error', text: 'Sign in to play.' });
    if (!minesAmount) return setMinesMsg({ status: 'error', text: 'Enter amount.' });
    setMinesBusy(true);
    setMinesMsg({ status: '', text: '' });
    try {
      const res = await fetch(`${backend}/games/mines`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ amount: Number(minesAmount), mines: Number(minesCount) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Bet failed');
      const win = data?.result?.win ?? data?.win ?? false;
      const payout = data?.result?.payout ?? data?.payout ?? 0;
      setMinesMsg({ status: 'success', text: win ? `Safe picks! You won ₹${payout}` : 'Hit a mine. Round lost.' });
    } catch (e) {
      setMinesMsg({ status: 'error', text: e.message || 'Something went wrong' });
    } finally {
      setMinesBusy(false);
    }
  };

  return (
    <section className="bg-gradient-to-b from-black to-zinc-950 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">Play Games</h2>
            <p className="mt-1 text-sm text-zinc-400">Place a quick bet. Winnings are credited instantly on success.</p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 md:flex">
            <Coins className="h-4 w-4 text-amber-300" /> INR Bets
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <BetCard title="Coin Flip" icon={<Dice5 className="h-5 w-5 text-emerald-400" />}> 
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setCoinChoice('heads')} className={`rounded-lg border px-3 py-2 text-sm ${coinChoice==='heads' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-white/10 bg-black text-zinc-300'}`}>Heads</button>
              <button onClick={() => setCoinChoice('tails')} className={`rounded-lg border px-3 py-2 text-sm ${coinChoice==='tails' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-white/10 bg-black text-zinc-300'}`}>Tails</button>
            </div>
            <input type="number" placeholder="Amount (INR)" value={coinAmount} onChange={(e)=>setCoinAmount(e.target.value)} className="mt-3 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            <button onClick={playCoin} disabled={coinBusy} className="mt-3 w-full rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 px-4 py-2 font-semibold text-black shadow-lg hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-60">
              {coinBusy ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/> Placing...</span> : 'Place Bet'}
            </button>
            <ResultBanner status={coinMsg.status} message={coinMsg.text} />
          </BetCard>

          <BetCard title="Color Prediction" icon={<Palette className="h-5 w-5 text-fuchsia-400" />}> 
            <div className="grid grid-cols-3 gap-2">
              {['red','green','blue'].map((c)=> (
                <button key={c} onClick={() => setColorPick(c)} className={`rounded-lg border px-3 py-2 text-sm capitalize ${colorPick===c ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-white/10 bg-black text-zinc-300'}`}>{c}</button>
              ))}
            </div>
            <input type="number" placeholder="Amount (INR)" value={colorAmount} onChange={(e)=>setColorAmount(e.target.value)} className="mt-3 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            <button onClick={playColor} disabled={colorBusy} className="mt-3 w-full rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 px-4 py-2 font-semibold text-black shadow-lg hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-60">
              {colorBusy ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/> Placing...</span> : 'Place Bet'}
            </button>
            <ResultBanner status={colorMsg.status} message={colorMsg.text} />
          </BetCard>

          <BetCard title="Aviator" icon={<Gauge className="h-5 w-5 text-cyan-400" />}> 
            <input type="number" placeholder="Amount (INR)" value={aviAmount} onChange={(e)=>setAviAmount(e.target.value)} className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            <button onClick={playAviator} disabled={aviBusy} className="mt-3 w-full rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 px-4 py-2 font-semibold text-black shadow-lg hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-60">
              {aviBusy ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/> Placing...</span> : 'Place Bet'}
            </button>
            <ResultBanner status={aviMsg.status} message={aviMsg.text} />
          </BetCard>

          <BetCard title="Mines" icon={<Bomb className="h-5 w-5 text-emerald-300" />}> 
            <div className="grid grid-cols-3 gap-2">
              {[3,5,8].map((n) => (
                <button key={n} onClick={() => setMinesCount(n)} className={`rounded-lg border px-3 py-2 text-sm ${minesCount===n ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300' : 'border-white/10 bg-black text-zinc-300'}`}>{n} mines</button>
              ))}
            </div>
            <input type="number" placeholder="Amount (INR)" value={minesAmount} onChange={(e)=>setMinesAmount(e.target.value)} className="mt-3 w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
            <button onClick={playMines} disabled={minesBusy} className="mt-3 w-full rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 px-4 py-2 font-semibold text-black shadow-lg hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-60">
              {minesBusy ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/> Placing...</span> : 'Place Bet'}
            </button>
            <ResultBanner status={minesMsg.status} message={minesMsg.text} />
          </BetCard>
        </div>
      </div>
    </section>
  );
}
