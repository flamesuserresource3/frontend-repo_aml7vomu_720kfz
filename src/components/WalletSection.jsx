import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Shield, CheckCircle2, IndianRupee, Loader2 } from 'lucide-react';
import { useAuth } from './AuthProvider';

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function WalletSection() {
  const { backend, token, user } = useAuth();
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('Pending admin approval');

  const submit = async () => {
    if (!token) {
      setMessage('Please sign in to submit a deposit.');
      return;
    }
    if (!amount || !file) {
      setMessage('Enter amount and upload a screenshot.');
      return;
    }
    setSubmitting(true);
    setMessage('Submitting...');
    try {
      const receipt_data_url = await fileToDataURL(file);
      const res = await fetch(`${backend}/deposits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount: Number(amount), receipt_data_url }),
      });
      if (!res.ok) throw new Error('Failed to submit deposit');
      await res.json();
      setMessage('Submitted! Awaiting admin review.');
      setAmount('');
      setFile(null);
    } catch (e) {
      setMessage(e.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="wallet" className="relative bg-black py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500">
            <Wallet className="h-5 w-5 text-black" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">INR Wallet & Deposits</h2>
            <p className="text-sm text-zinc-400">Scan, upload receipt, and get credited after admin review.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.5 }} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
            <h3 className="mb-2 text-lg font-semibold text-white">Add Funds</h3>
            <p className="mb-4 text-sm text-zinc-300">Use the scanner provided by admin to deposit INR. After payment, upload the screenshot and your account will be credited once approved.</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-black p-3 text-center text-zinc-300">
                <div className="text-xs">UPI Accepted</div>
                <div className="mt-1 font-semibold text-white">Fast & Secure</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-black p-3 text-center text-zinc-300">
                <div className="text-xs">INR</div>
                <div className="mt-1 inline-flex items-center justify-center gap-1 font-semibold text-emerald-400">
                  <IndianRupee className="h-4 w-4" /> Supported
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <input type="number" placeholder="Amount (INR)" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white file:mr-3 file:rounded-md file:border-0 file:bg-emerald-500 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-black hover:file:bg-emerald-400" />
              <button onClick={submit} disabled={submitting} className="w-full rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 px-4 py-2 font-semibold text-black shadow-lg hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-60">
                {submitting ? (<span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/> Submitting</span>) : 'Submit for Review'}
              </button>
              <p className="text-xs text-zinc-400">Status: <span className="font-medium text-white">{message}</span></p>
              {user && <p className="text-xs text-zinc-500">Signed in as {user.email}{user.is_admin ? ' (Admin)' : ''}</p>}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ delay: 0.1, duration: 0.5 }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-5">
            <h3 className="mb-3 text-lg font-semibold text-white">Security & Compliance</h3>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" /> 2-step review by admins before crediting coins.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" /> Transparent wallet history and responsible limits.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" /> Data secured with modern best practices.</li>
            </ul>

            <div id="security" className="mt-5 rounded-xl border border-white/10 bg-black p-4">
              <div className="mb-2 flex items-center gap-2 text-sm text-zinc-300">
                <Shield className="h-4 w-4 text-emerald-400" /> Account Protection
              </div>
              <p className="text-sm text-zinc-400">Your identity and transactions are safeguarded. Always play responsibly.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
