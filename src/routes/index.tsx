import { createFileRoute, Link } from '@tanstack/react-router';
import { DonationCalculator } from '@/components/DonationCalculator';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="space-y-12 max-w-5xl flex-col flex items-center">
      <h1 className="text-5xl/12 text-center font-semibold text-zinc-700 p-8">
        Twoja krew może ocalić <br className="hidden xl:block" /> ludzkie{' '}
        <span className="text-red-500/90">życie</span>. Pomóż innym. <br className="hidden xl:block" /> Zostań
        krwiodawcą.
      </h1>

      <div className="w-full p-6 bg-zinc-50 border border-zinc-200 rounded-lg shadow-md">
        <h2 className="font-semibold text-center pb-8 text-xl text-zinc-600">
          Pierwszą dotację masz za sobą? Sprawdź możliwy termin kolejnej.
        </h2>
        <DonationCalculator />
      </div>

      <div className="text-center">
        <p className="text-lg text-zinc-600">
          Jesteś tu pierwszy raz?{' '}
          <Link to="/faq" className="font-semibold text-red-600 hover:underline">
            Dowiedz się, jak zacząć oddawać krew (FAQ)
          </Link>
        </p>
      </div>
    </div>
  );
}
