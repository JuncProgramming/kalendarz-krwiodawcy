import { FileCheck, Paperclip } from 'lucide-react';
import { type Donation } from '@/types';

export function DonationItem({ donation }: { donation: Donation }) {
  return (
    <div className="p-4 bg-white border border-zinc-200 rounded-md transition-shadow hover:shadow-sm flex justify-between items-start">
      <div>
        <p className="font-semibold text-zinc-800">{donation.type}</p>
        <p className="text-sm text-zinc-600">{donation.date}</p>
        <p className="text-xs text-zinc-500 mt-1">{donation.location}</p>
      </div>

      {donation.resultsLink ?
        <a
          href={donation.resultsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 border cursor-pointer border-zinc-200 rounded-md text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 transition-colors"
          title="Zobacz wyniki badań">
          <FileCheck size={20} />
        </a>
      : <button
          className="p-2 border cursor-pointer border-zinc-200 rounded-md text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 transition-colors"
          title="Dodaj wyniki badań">
          <Paperclip size={20} />
        </button>
      }
    </div>
  );
}
