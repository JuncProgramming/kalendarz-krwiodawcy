import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

export const Route = createFileRoute('/forgot-password/')({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || email.length < 1) {
      setError('E-mail musi być prawidłowy');
      return;
    }

    setLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      setError('Nieprawidłowy email');
      setLoading(false);
    } else {
      setMessage(
        'Jeśli ten e-mail jest powiązany z Twoim kontem, został na niego wysłany link do resetu hasła'
      );
    }
  };

  return (
    <div className="flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-xl max-w-md">
        <div className="bg-white rounded-lg shadow-sm border border-zinc-200 p-8">
          <div className="p-2">
            <h1 className="text-3xl font-bold text-zinc-700 text-center mb-2">
              Resetowanie hasła
            </h1>
            <p className="text-zinc-600 text-center mb-6">
              Podaj swój e-mail, aby otrzymać <br className="block" /> link do zmiany hasła
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

            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Wysyłanie...' : 'Wyślij link'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
