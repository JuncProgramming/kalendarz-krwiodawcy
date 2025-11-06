import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const Route = createFileRoute('/login/')({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      setError('Nieprawidłowy email lub hasło');
      setLoading(false);
    } else {
      navigate({ to: '/' });
    }
  };

  return (
    <div className="flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-xl max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-8">
          <div className='p-2'>
            <h1 className="text-3xl font-bold text-zinc-700 text-center mb-2">
              Logowanie
            </h1>
            <p className="text-zinc-600 text-center mb-6">
              Witaj ponownie! Zaloguj się do swojego konta
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="twoj@email.pl"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 mb-1">
                Hasło
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Twoje hasło"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Logowanie...' : 'Zaloguj się'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-600">
            Nie masz konta?{' '}
            <Link
              to="/register"
              className="font-semibold text-red-600 hover:text-red-700">
              Zarejestruj się
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
