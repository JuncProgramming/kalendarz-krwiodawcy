import { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import type { ConfirmModalProps } from '@/types';

export function ConfirmModal({ onClose, onConfirm }: ConfirmModalProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto'>
      <div
        className='fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200'
        onClick={onClose}
        aria-hidden='true'
      />

      <div className='flex min-h-full items-center justify-center p-4 text-center sm:p-6'>
        <div
          className='relative p-4 sm:p-6 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-lg animate-in zoom-in-95 duration-200'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='flex border-b border-zinc-200 pb-4 mb-4 justify-between items-center'>
            <h3 className='text-xl font-bold text-zinc-800'>Usuń donację</h3>
            <button
              onClick={onClose}
              className='p-2 rounded-md text-zinc-600 hover:text-zinc-800 transition-colors'
            >
              <X size={20} />
            </button>
          </div>

          <div className='space-y-6'>
            <div className='flex items-start gap-4'>
              <div
                className={'p-3 rounded-full shrink-0 bg-red-50 text-red-600'}
              >
                <AlertTriangle size={24} />
              </div>
              <p className='text-zinc-600 mt-1'>
                Czy na pewno chcesz usunąć tę donację? Tej operacji nie można
                cofnąć
              </p>
            </div>

            <div className='flex gap-3 justify-end pt-2'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-md hover:bg-zinc-50 focus:ring-zinc-500 transition-colors'
              >
                Anuluj
              </button>
              <button
                type='button'
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className={
                  'px-4 py-2 text-sm font-medium text-white rounded-md transition-colors bg-red-600 hover:bg-red-700'
                }
              >
                Usuń
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
