import { motion } from 'framer-motion';
import { Wallet, Shield, CheckCircle2, IndianRupee } from 'lucide-react';

export default function WalletSection() {
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5"
          >
            <h3 className="mb-2 text-lg font-semibold text-white">Add Funds</h3>
            <p className="mb-4 text-sm text-zinc-300">
              Use the scanner provided by admin to deposit INR. After payment, upload the screenshot and your account will be credited once approved.
            </p>
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

            <form className="mt-5 space-y-3">
              <input
                type="text"
                placeholder="Amount (INR)"
                className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <input
                type="file"
                accept="image/*"
                className="w-full rounded-lg border border-white/10 bg-black px-3 py-2 text-white file:mr-3 file:rounded-md file:border-0 file:bg-emerald-500 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-black hover:file:bg-emerald-400"
              />
              <button type="button" className="w-full rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 px-4 py-2 font-semibold text-black shadow-lg hover:from-emerald-400 hover:to-cyan-400">
                Submit for Review
              </button>
              <p className="text-xs text-zinc-400">
                Status: <span className="font-medium text-white">Pending admin approval</span>
              </p>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-5"
          >
            <h3 className="mb-3 text-lg font-semibold text-white">Security & Compliance</h3>
            <ul className="space-y-3 text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                2-step review by admins before crediting coins.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                Transparent wallet history and responsible limits.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-400" />
                Data secured with modern best practices.
              </li>
            </ul>

            <div id="security" className="mt-5 rounded-xl border border-white/10 bg-black p-4">
              <div className="mb-2 flex items-center gap-2 text-sm text-zinc-300">
                <Shield className="h-4 w-4 text-emerald-400" /> Account Protection
              </div>
              <p className="text-sm text-zinc-400">
                Your identity and transactions are safeguarded. Always play responsibly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
