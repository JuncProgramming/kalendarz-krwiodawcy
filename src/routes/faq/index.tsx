import { createFileRoute } from '@tanstack/react-router';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/faq/')({
  component: FaqComponent,
});

function FaqComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full space-y-6 flex-col flex items-center p-6">
      <h1 className="text-3xl text-center font-semibold text-zinc-700">
        Jak zacząć oddawać krew?
      </h1>
      <div className="w-full max-w-3xl space-y-3">
        <div className="w-full mx-auto border-zinc-200 border bg-white rounded-md overflow-hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-zinc-50 transition-colors">
            <span className="font-semibold text-zinc-700">
              Jak przygotować się do pierwszego oddania krwi?
            </span>
            {isOpen ?
              <ChevronUp className="shrink-0" />
            : <ChevronDown className="shrink-0" />}
          </button>

          {isOpen && (
            <div className="px-4 pb-4 text-zinc-600 border-t border-zinc-100">
              <p className="pt-3">
                Przed pierwszym oddaniem krwi warto się odpowiednio przygotować:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-3">
                <li>Wypij co najmniej 2 szklanki wody przed donacją</li>
                <li>Zjedz lekki posiłek 2-3 godziny przed oddaniem krwi</li>
                <li>Wyśpij się - minimum 6-8 godzin snu</li>
                <li>Weź ze sobą dowód osobisty</li>
                <li>Unikaj alkoholu 24 godziny przed donacją</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
