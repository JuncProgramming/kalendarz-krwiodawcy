import { useState } from 'react';

type DonationType = 'krew_pelna' | 'osocze' | 'plytki';

export function DonationCalculator() {
  const [lastDonationDate, setLastDonationDate] = useState('');
  const [lastDonationType, setLastDonationType] =
    useState<DonationType>('krew_pelna');
  const [nextDonationType, setNextDonationType] =
    useState<DonationType>('krew_pelna');
  const [nextDonationDate, setNextDonationDate] = useState<Date | null>(null);
  const [showGenderNote, setShowGenderNote] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataBazowa = new Date(lastDonationDate);
    let dniDoDodania = 0;

    if (
      lastDonationType === 'krew_pelna' &&
      nextDonationType === 'krew_pelna'
    ) {
      setShowGenderNote(true);
      dniDoDodania = 56;
    } else if (
      ((lastDonationType === 'osocze' || lastDonationType === 'plytki') &&
        nextDonationType === 'krew_pelna') ||
      (lastDonationType === 'osocze' && nextDonationType === 'plytki') ||
      (lastDonationType === 'plytki' && nextDonationType === 'osocze')
    ) {
      dniDoDodania = 2;
    } else if (
      (lastDonationType === 'osocze' && nextDonationType === 'osocze') ||
      (lastDonationType === 'plytki' && nextDonationType === 'plytki')
    ) {
      dniDoDodania = 14;
    } else {
      setShowGenderNote(false);
      dniDoDodania = 28;
    }

    const nowaData = new Date(dataBazowa.getTime());
    nowaData.setDate(nowaData.getDate() + dniDoDodania);

    setNextDonationDate(nowaData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="date" className="mb-1 font-medium text-zinc-600">
          Data ostatniej donacji:
        </label>
        <input
          type="date"
          id="date"
          required
          value={lastDonationDate}
          onChange={(e) => setLastDonationDate(e.target.value)}
          className="p-2 border border-zinc-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="lastDonationType"
          className="mb-1 font-medium text-zinc-600">
          Co oddano (ostatnio):
        </label>
        <select
          id="lastDonationType"
          value={lastDonationType}
          onChange={(e) => setLastDonationType(e.target.value as DonationType)}
          className="p-2 border border-zinc-300 rounded-md bg-white">
          <option value="krew_pelna">Krew pełna</option>
          <option value="osocze">Osocze (Plazma)</option>
          <option value="plytki">Płytki krwi (Trombocyty)</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="nextDonationType"
          className="mb-1 font-medium text-zinc-600">
          Co chcesz oddać (teraz):
        </label>
        <select
          id="nextDonationType"
          value={nextDonationType}
          onChange={(e) => setNextDonationType(e.target.value as DonationType)}
          className="p-2 border border-zinc-300 rounded-md bg-white">
          <option value="krew_pelna">Krew pełna</option>
          <option value="osocze">Osocze (Plazma)</option>
          <option value="plytki">Płytki krwi (Trombocyty)</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition-colors">
        Sprawdź termin
      </button>

      {nextDonationDate && (
        <div className="text-center bg-green-100 p-4 rounded-md">
          <p className="font-medium text-green-800">
            Możesz znów oddać krew od:
          </p>
          <p className="text-2xl font-bold text-green-900">
            {nextDonationDate.toLocaleDateString('pl-PL')}
          </p>
        </div>
      )}

      {showGenderNote && (
        <div className="text-center bg-yellow-100 p-3 rounded-md">
          <p className="font-medium text-sm text-yellow-800">
            <strong>Uwaga:</strong> Obliczona data (56 dni) to minimum dla{' '}
            <strong>mężczyzn</strong> (do 6 donacji rocznie). Kobiety mogą oddać
            krew pełną <strong>4 razy w roku</strong>, co oznacza przerwę min.{' '}
            <strong>84 dni (12 tygodni)</strong>.
          </p>
        </div>
      )}

      <p className="text-xs text-zinc-500 text-center">
        Pamiętaj, że jest to data orientacyjna. Ostateczną decyzję o Twojej
        zdolności do oddania krwi zawsze podejmuje lekarz.
      </p>
    </form>
  );
}
