import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GamesShowcase from './components/GamesShowcase';
import WalletSection from './components/WalletSection';

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-8 text-center">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-sm text-zinc-400">
          © {new Date().getFullYear()} BlazeBet. Play responsibly. 18+ only.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <GamesShowcase />
      <WalletSection />
      <Footer />
    </div>
  );
}
