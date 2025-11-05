import React from 'react';
import { Coins, Palette, Plane, Grid } from 'lucide-react';

const Card = ({ icon: Icon, title, desc, color }) => (
  <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
    <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
      <Icon size={22} />
    </div>
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-sm text-white/70">{desc}</p>
  </div>
);

export default function GamesShowcase() {
  const items = [
    { icon: Coins, title: 'Coin Flip', desc: 'Heads or Tails — quick wins with fair odds.', color: 'bg-amber-500/20 text-amber-300' },
    { icon: Palette, title: 'Color Prediction', desc: 'Pick the color and multiply your stake.', color: 'bg-fuchsia-500/20 text-fuchsia-300' },
    { icon: Plane, title: 'Aviator', desc: 'Cash out before the plane flies away.', color: 'bg-emerald-500/20 text-emerald-300' },
    { icon: Grid, title: 'Mines', desc: 'Avoid the bombs and collect gems.', color: 'bg-sky-500/20 text-sky-300' },
  ];

  return (
    <div>
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold">Games</h2>
          <p className="text-white/70 text-sm">Four exciting ways to play and win.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((it) => (
          <Card key={it.title} {...it} />
        ))}
      </div>
    </div>
  );
}
