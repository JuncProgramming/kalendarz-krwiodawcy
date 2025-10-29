import { Link } from '@tanstack/react-router';
import { Droplet } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm border-b border-zinc-200 sticky top-0 z-10">
      <nav className="mx-auto flex items-center justify-between p-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-red-600 hover:text-red-700 transition-colors">
          <Droplet size={24} />
          <span>Kalendarz Krwiodawcy</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="font-semibold text-zinc-600 hover:text-zinc-800 transition-colors">
            Jak zacząć? (FAQ)
          </Link>

          <Link
            to="/"
            className="font-semibold text-zinc-700 border border-zinc-300 py-2 px-4 rounded-md hover:bg-zinc-100 transition-colors">
            Zaloguj się
          </Link>

          <Link
            to="/"
            className="font-semibold text-white bg-zinc-700 py-2 px-4 rounded-md hover:bg-zinc-800 transition-colors">
            Zarejestruj się
          </Link>
        </div>
      </nav>
    </header>
  );
}
