import React, { useState } from 'react';
import { Upload, IndianRupee, CheckCircle2, AlertCircle } from 'lucide-react';

export default function WalletSection({ onDepositSuccess }) {
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const backend = import.meta.env.VITE_BACKEND_URL;

  const handleFile = (f) => {
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result);
    reader.readAsDataURL(f);
    setFile(f);
  };

  const submit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const amt = parseInt(amount, 10);
    if (!amt || amt <= 0) {
      setMessage({ type: 'error', text: 'Enter a valid amount in INR.' });
      return;
    }
    if (!preview) {
      setMessage({ type: 'error', text: 'Upload a receipt screenshot.' });
      return;
    }

    // If backend is missing, simulate success for demo UX
    if (!backend) {
      onDepositSuccess && onDepositSuccess(amt);
      setMessage({ type: 'success', text: 'Deposit submitted (demo). Set VITE_BACKEND_URL to enable API.' });
      setAmount('');
      setFile(null);
      setPreview('');
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(`${backend}/deposits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: amt, receipt_data_url: preview })
      });
      if (!res.ok) throw new Error(await res.text());
      onDepositSuccess && onDepositSuccess(amt);
      setMessage({ type: 'success', text: 'Deposit submitted! Awaiting approval.' });
      setAmount('');
      setFile(null);
      setPreview('');
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to submit deposit. Check backend URL or try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Wallet</h2>
        <p className="text-white/70 text-sm">Deposit INR securely. Upload your receipt as a screenshot.</p>
      </div>

      <form onSubmit={submit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
          <label className="block text-sm mb-2 text-white/80">Amount (INR)</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl bg-slate-950/60 border border-white/10 px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-fuchsia-500/40"
              placeholder="Enter amount"
            />
            <IndianRupee size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
          </div>

          <div className="mt-6">
            <label className="block text-sm mb-2 text-white/80">Receipt Screenshot</label>
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/15 rounded-xl cursor-pointer bg-white/5 hover:bg-white/10 transition-colors">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
              <Upload className="text-white/60" />
              <span className="mt-2 text-sm text-white/70">Click to upload image</span>
            </label>
          </div>

          {preview && (
            <div className="mt-6">
              <label className="block text-sm mb-2 text-white/80">Preview</label>
              <img src={preview} alt="Receipt preview" className="w-full max-h-72 object-contain rounded-xl border border-white/10" />
            </div>
          )}
        </div>

        <div className="lg:col-span-1 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold mb-2">UPI Details</h3>
            <p className="text-sm text-white/70">Pay to our UPI and upload your receipt. Your balance updates after approval.</p>
            <div className="mt-3 rounded-lg bg-black/30 border border-white/10 p-3 text-sm">
              <div className="flex items-center justify-between"><span className="text-white/60">UPI</span><span className="font-medium">desibet@upi</span></div>
              <div className="flex items-center justify-between mt-1"><span className="text-white/60">Min</span><span className="font-medium">₹100</span></div>
            </div>
          </div>

          <button
            disabled={submitting}
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-3 font-semibold shadow hover:from-emerald-400 hover:to-teal-400 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting…' : 'Submit Deposit'}
          </button>

          {message && (
            <div className={`flex items-start gap-2 rounded-xl border p-3 ${message.type === 'success' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200' : 'border-rose-400/30 bg-rose-400/10 text-rose-200'}`}>
              {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span className="text-sm">{message.text}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
