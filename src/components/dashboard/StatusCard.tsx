import type { StatusCardProps } from '@/types';

const StatusCard = ({ daysRemaining, progress, nextDate }: StatusCardProps) => {
  return (
    <section className="bg-linear-to-br from-red-50 to-white p-6 rounded-lg border border-red-100 shadow-sm shadow-red-50">
      <h2 className="text-lg font-semibold text-zinc-800 mb-4">Twój status</h2>
      <div className="flex items-end gap-2">
        <span className="text-4xl font-bold text-red-600">
          {daysRemaining} dni
        </span>
        <span className="text-zinc-600 mb-1.5 font-medium">
          do kolejnej donacji
        </span>
      </div>
      <div className="w-full bg-zinc-200 rounded-full h-2.5 mt-6">
        <div
          className="bg-red-600 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-sm text-zinc-500 mt-6 text-right">
        Przewidywana data: {nextDate}
      </p>
    </section>
  );
};

export default StatusCard;
