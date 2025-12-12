import { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import Spinner from './Spinner';
import { type AddDonationModalProps } from '@/types';

export function AddDonationModal({
  isOpen,
  onClose,
  onSave,
}: AddDonationModalProps) {
  const defaultDate = new Date().toISOString().split('T')[0]

  const [date, setDate] = useState(defaultDate);
  const [type, setType] = useState('Krew pełna');
  const [location, setLocation] = useState('RCKiK Warszawa');
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setDate(defaultDate);
      setType('Krew pełna');
      setLocation('RCKiK Warszawa');
      setFile(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      onSave({ date, type, location, file });
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"></div>

      <div className="flex min-h-full items-center justify-center text-center">
        <div
          className="relative p-6 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-md animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}>
          <div className="flex border-b border-zinc-100 pb-4 mb-4 justify-between items-center">
            <h3 className="text-xl font-bold text-zinc-800">
              Dodaj nową donację
            </h3>
            <button
              onClick={onClose}
              className="p-2 border border-zinc-200 rounded-md text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50 transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex flex-col">
                <label
                  htmlFor="date"
                  className="mb-1 font-medium text-zinc-600">
                  Data donacji
                </label>
                <input
                  type="date"
                  id="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="p-2 border border-zinc-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-zinc-600">
                  Typ donacji
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border border-zinc-300 rounded-md cursor-pointer hover:bg-zinc-50 transition-colors">
                    <input
                      type="radio"
                      name="donationType"
                      value="Krew pełna"
                      checked={type === 'Krew pełna'}
                      onChange={(e) => setType(e.target.value)}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-3 text-zinc-700">Krew pełna</span>
                  </label>
                  <label className="flex items-center p-3 border border-zinc-300 rounded-md cursor-pointer hover:bg-zinc-50 transition-colors">
                    <input
                      type="radio"
                      name="donationType"
                      value="Osocze"
                      checked={type === 'Osocze'}
                      onChange={(e) => setType(e.target.value)}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-3 text-zinc-700">Osocze (Plazma)</span>
                  </label>
                  <label className="flex items-center p-3 border border-zinc-300 rounded-md cursor-pointer hover:bg-zinc-50 transition-colors">
                    <input
                      type="radio"
                      name="donationType"
                      value="Płytki krwi"
                      checked={type === 'Płytki krwi'}
                      onChange={(e) => setType(e.target.value)}
                      className="w-4 h-4 text-red-600 focus:ring-red-500"
                    />
                    <span className="ml-3 text-zinc-700">
                      Płytki krwi (Trombocyty)
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="location"
                  className="mb-1 font-medium text-zinc-600">
                  Miejsce (Punkt)
                </label>
                <input
                  type="text"
                  id="location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="np. RCKiK Kraków"
                  className="p-2 border border-zinc-300 rounded-md focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1 font-medium text-zinc-600">
                  Wyniki badań (opcjonalne)
                </label>
                <label
                  htmlFor="file"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                    isDragging ?
                      'border-red-500 bg-red-50'
                    : 'border-zinc-300 bg-zinc-50 hover:bg-zinc-100'
                  }`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload
                      className={`w-8 h-8 mb-2 ${
                         'text-zinc-400'
                      }`}
                    />
                    <p className="mb-2 text-sm text-zinc-500">
                      <span className="font-semibold">
                        Kliknij lub upuść plik
                      </span>
                    </p>
                    <p className="text-xs text-zinc-500">
                      PDF, JPG, PNG (max. 5MB)
                    </p>
                  </div>
                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />
                </label>
                {file && (
                  <p className="mt-2 text-sm text-zinc-600">
                    Wybrano plik:{' '}
                    <span className="font-semibold">{file.name}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition-colors flex justify-center items-center gap-2 disabled:opacity-70">
                {isSubmitting && <Spinner size="sm" />}
                {isSubmitting ? 'Zapisywanie...' : 'Zapisz'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
