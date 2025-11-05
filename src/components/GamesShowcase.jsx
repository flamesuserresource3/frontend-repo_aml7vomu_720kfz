import { motion } from 'framer-motion';
import { Gamepad2, Coins } from 'lucide-react';

const games = [
  {
    key: 'mines',
    title: 'Mines',
    desc: 'Tiptoe through tiles. Avoid mines, cash out smart.',
    color: 'from-emerald-500/20 to-emerald-400/10',
  },
  {
    key: 'aviator',
    title: 'Aviator',
    desc: 'Ride the multiplier, but don’t get caught when it flies.',
    color: 'from-cyan-500/20 to-cyan-400/10',
  },
  {
    key: 'color',
    title: 'Color Prediction',
    desc: 'Pick your color, watch the wheel reveal the luck.',
    color: 'from-fuchsia-500/20 to-violet-400/10',
  },
  {
    key: 'coin',
    title: 'Coin Flip',
    desc: 'Heads or tails with crisp, fast rounds.',
    color: 'from-amber-500/20 to-orange-400/10',
  },
];

export default function GamesShowcase() {
  return (
    <section id="games" className="relative bg-gradient-to-b from-black to-zinc-950 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">Featured Games</h2>
            <p className="mt-1 text-sm text-zinc-400">Polished gameplay, instant rounds, and beautiful motion.</p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300 md:flex">
            <Gamepad2 className="h-4 w-4" /> Curated for high speed
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {games.map((g, i) => (
            <motion.div
              key={g.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${g.color} p-4`}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="flex min-h-[160px] flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">{g.title}</h3>
                  <p className="mt-1 text-sm text-zinc-300">{g.desc}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <button className="relative z-10 inline-flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black shadow-md transition hover:bg-zinc-100">
                    Play Now
                  </button>
                  <div className="relative z-10 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-300">
                    <Coins className="h-3.5 w-3.5 text-amber-300" /> INR
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
