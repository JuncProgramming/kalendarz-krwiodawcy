import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { type FaqCardProps } from '@/types';

function FaqCard({ question, children }: FaqCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mx-auto border-zinc-200 border bg-white rounded-md overflow-hidden">
      <div className="w-full flex items-center justify-between gap-4 p-4 pl-6">
        <span className="font-semibold text-zinc-700">{question}</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-zinc-100 transition-colors"
          aria-label={isOpen ? 'Zwiń odpowiedź' : 'Rozwiń odpowiedź'}>
          {isOpen ?
            <ChevronUp className="shrink-0" />
          : <ChevronDown className="shrink-0" />}
        </button>
      </div>

      {isOpen && (
        <div className="px-8 py-6 text-zinc-600 border-t border-zinc-100">
          {children}
        </div>
      )}
    </div>
  );
}

export default FaqCard;
