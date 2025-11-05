import React, { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import GamesShowcase from './components/GamesShowcase.jsx';
import WalletSection from './components/WalletSection.jsx';

function App() {
  const [balance, setBalance] = useState(0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar balance={balance} />
      <main className="flex-1">
        <section id="home" className="relative h-[80vh] md:h-[90vh]">
          <Hero onGetStartedScrollTo="#wallet" />
        </section>
        <section id="games" className="py-16 md:py-24 container mx-auto px-4">
          <GamesShowcase />
        </section>
        <section id="wallet" className="py-16 md:py-24 container mx-auto px-4">
          <WalletSection onDepositSuccess={(amount) => setBalance((b) => b + amount)} />
        </section>
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/60">
        © {new Date().getFullYear()} DesiBet • Play responsibly. 18+
      </footer>
    </div>
  );
}

export default App;
