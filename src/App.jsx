import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GamesShowcase from './components/GamesShowcase';
import WalletSection from './components/WalletSection';
import WalletHistory from './components/WalletHistory';
import GameCenter from './components/GameCenter';
import { AuthProvider } from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-8 text-center">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-sm text-zinc-400">© {new Date().getFullYear()} BlazeBet. Play responsibly. 18+ only.</p>
      </div>
    </footer>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <GamesShowcase />
      <WalletSection />
      <WalletHistory />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-black text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/wallet" element={<><WalletSection /><WalletHistory /></>} />
            <Route path="/games" element={<GameCenter />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div className="p-10 text-center text-zinc-400">Not found. <Link to="/" className="text-emerald-400">Go home</Link></div>} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
