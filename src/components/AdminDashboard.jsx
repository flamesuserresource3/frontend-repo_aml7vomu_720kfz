import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from './AuthProvider';

export default function AdminDashboard() {
  const { backend, token } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${backend}/deposits?status=pending`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setItems(data.items || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const act = async (id, action) => {
    await fetch(`${backend}/deposits/${id}/${action}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPending();
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="mb-6 text-2xl font-semibold">Admin Panel</h2>
      {loading ? (
        <div className="flex items-center gap-2 text-zinc-400"><Loader2 className="h-4 w-4 animate-spin"/> Loading...</div>
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-white/10 p-6 text-zinc-400">No pending deposits.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((d) => (
            <div key={d.id} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-sm text-zinc-400">User</div>
                  <div className="text-white">{d.user_id}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-zinc-400">Amount</div>
                  <div className="text-emerald-400 font-semibold">₹ {d.amount}</div>
                </div>
              </div>
              {d.receipt_data_url && (
                <img src={d.receipt_data_url} alt="receipt" className="mb-3 max-h-60 w-full rounded-lg object-contain" />
              )}
              <div className="flex gap-2">
                <button onClick={() => act(d.id, 'approve')} className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-medium text-black hover:bg-emerald-400">
                  <CheckCircle2 className="h-4 w-4"/> Approve
                </button>
                <button onClick={() => act(d.id, 'reject')} className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-zinc-200 hover:bg-white/5">
                  <XCircle className="h-4 w-4"/> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
