import { useEffect, useState } from 'react';
import { Clock, IndianRupee, Loader2, BadgeCheck } from 'lucide-react';
import { useAuth } from './AuthProvider';

export default function WalletHistory() {
  const { backend, token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    const run = async () => {
      if (!token) { setLoading(false); return; }
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${backend}/deposits`, { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok) throw new Error('Could not load deposit history');
        const data = await res.json();
        if (!active) return;
        setItems(data.items || data || []);
      } catch (e) {
        if (!active) return;
        setError(e.message || 'Failed to load');
      } finally {
        if (active) setLoading(false);
      }
    };
    run();
    return () => { active = false; };
  }, [backend, token]);

  return (
    <section className="bg-black py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center gap-2">
          <Clock className="h-5 w-5 text-zinc-300" />
          <h3 className="text-lg font-semibold text-white">Wallet History</h3>
        </div>
        {loading ? (
          <div className="flex items-center gap-2 text-zinc-400"><Loader2 className="h-4 w-4 animate-spin"/> Loading...</div>
        ) : error ? (
          <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border border-white/10 p-4 text-sm text-zinc-400">No deposits yet.</div>
        ) : (
          <ol className="relative border-l border-white/10 pl-6">
            {items.map((d, idx) => (
              <li key={d.id || idx} className="mb-6 ml-2">
                <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full border border-white/10 bg-zinc-900">
                  <BadgeCheck className={`h-3 w-3 ${d.status==='approved' ? 'text-emerald-400' : d.status==='rejected' ? 'text-red-400' : 'text-zinc-400'}`} />
                </span>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-zinc-300">{new Date(d.created_at || d.createdAt || Date.now()).toLocaleString()}</div>
                  <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-zinc-300">
                    <IndianRupee className="h-3 w-3"/> {d.amount}
                  </div>
                </div>
                <div className="mt-1 text-sm">
                  <span className={`rounded-md px-2 py-0.5 text-xs ${d.status==='approved' ? 'bg-emerald-500/10 text-emerald-300' : d.status==='rejected' ? 'bg-red-500/10 text-red-300' : 'bg-white/10 text-zinc-300'}`}>{d.status || 'pending'}</span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
