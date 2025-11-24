import { Plus } from 'lucide-react';
import { DonationItem } from './DashboardDonationItem';
import type { DonationsHistoryCardProps } from '@/types';

const DonationsHistoryCard = ({
  donations,
  onClick,
}: DonationsHistoryCardProps) => {
  return (
    <>
      <div className="space-y-3 grow">
        {donations.length === 0 ?
          <p className="text-zinc-500 text-sm">Brak zapisanych donacji.</p>
        : donations.map((donation) => (
            <DonationItem key={donation.id} donation={donation} />
          ))
        }
      </div>
      <button
        onClick={onClick}
        className="w-full mt-6 bg-red-600 text-white font-semibold py-2.5 px-6 rounded-md hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-sm">
        <Plus size={20} />
        Dodaj donację
      </button>
    </>
  );
};

export default DonationsHistoryCard;
