import { FileCheck, Paperclip, Trash2 } from 'lucide-react';
import { type Donation } from '@/types';
import { useRef } from 'react';

export function DonationItem({
  donation,
  onDelete,
  onUpload,
  onViewResult,
}: {
  donation: Donation;
  onDelete: (id: string) => void;
  onUpload: (id: string, file: File) => void;
  onViewResult: (path: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUpload(donation.id, file);
    }
  };

  return (
    <div className="p-4 bg-white border border-zinc-200 rounded-md transition-shadow hover:shadow-sm flex justify-between items-start">
      <div>
        <p className="font-semibold text-zinc-800">{donation.type}</p>
        <p className="text-sm text-zinc-600">{donation.date}</p>
        <p className="text-xs text-zinc-500 mt-1">{donation.location}</p>
      </div>

      <div className="flex gap-2">
        {donation.results_url ?
          <button
            onClick={() => onViewResult(donation.results_url!)}
            className="p-2 border cursor-pointer border-zinc-200 rounded-md text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 transition-colors"
            title="Zobacz wyniki badań">
            <FileCheck size={20} />
          </button>
        : <>
            <input
              type="file"
              // Doing this, because the default shit is ugly and it needs to get clicked programmatically
              ref={fileInputRef}
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2 border cursor-pointer border-zinc-200 rounded-md text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 transition-colors"
              title="Dodaj wyniki badań">
              <Paperclip size={20} />
            </button>
          </>
        }
        <button
          onClick={() => onDelete(donation.id)}
          className="p-2 border cursor-pointer border-zinc-200 rounded-md text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 transition-colors"
          title="Usuń donację">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
