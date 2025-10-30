import { Link } from '@tanstack/react-router';
import { Droplet, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <nav className="max-w-[2560px] mx-auto flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <Link
            to="/"
            className="flex items-center gap-1.5 md:gap-2 text-base md:text-lg font-bold text-red-600 hover:text-red-700 transition-colors">
            <Droplet className="shrink-0" size={20} />
            <span className="whitespace-nowrap">Kalendarz Krwiodawcy</span>
          </Link>

          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <Link
              to="/faq"
              className="text-sm font-semibold text-zinc-600 hover:text-zinc-800 transition-colors whitespace-nowrap">
              FAQ
            </Link>

            <Link
              to="/"
              className="text-sm font-semibold text-zinc-700 border border-zinc-300 py-1.5 px-3 rounded-md hover:bg-zinc-100 transition-colors whitespace-nowrap">
              Zaloguj się
            </Link>

            <Link
              to="/"
              className="text-sm font-semibold text-white bg-zinc-700 py-1.5 px-3 rounded-md hover:bg-zinc-800 transition-colors whitespace-nowrap">
              Zarejestruj się
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ?
              <X size={20} />
            : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <>
          <div
            className="md:hidden fixed bg-black/20 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="md:hidden fixed top-14 left-0 right-0 bg-white shadow-lg z-40 max-h-[calc(100vh-56px)] overflow-y-auto">
            <nav
              className="flex flex-col p-3"
              role="navigation"
              aria-label="Mobile navigation">
              <Link
                to="/faq"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold text-zinc-600 hover:text-zinc-800 hover:bg-zinc-50 py-2.5 px-3 rounded-md transition-colors">
                FAQ
              </Link>

              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold text-zinc-700 border border-zinc-300 py-2.5 px-3 rounded-md hover:bg-zinc-100 transition-colors text-center mt-2">
                Zaloguj się
              </Link>

              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-sm font-semibold text-white bg-zinc-700 py-2.5 px-3 rounded-md hover:bg-zinc-800 transition-colors text-center mt-2">
                Zarejestruj się
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
