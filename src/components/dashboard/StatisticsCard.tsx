import type { Donation } from '@/types';
import { Droplet, Heart, Activity } from 'lucide-react';

const StatisticsCard = ({ donations }: { donations: Donation[] }) => {
  const totalLiters = parseFloat((donations.length * 0.45).toFixed(2));
  const savedLives = donations.length * 3;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
      <div className="relative overflow-hidden bg-linear-to-br from-red-500 to-red-600 rounded-2xl p-4 sm:p-5 text-white shadow-lg shadow-red-200 transition-transform hover:scale-[1.02] duration-300">
        <div className="relative z-10 flex flex-col h-full justify-between min-h-[100px]">
          <div className="flex items-center gap-2 text-red-100 mb-2">
            <Activity size={16} className="shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Uratowane życia
            </span>
          </div>
          <p className="text-4xl font-extrabold tracking-tight">{savedLives}</p>
        </div>
        <Heart
          className="absolute -bottom-6 -right-6 w-32 h-32 text-white/10 rotate-12"
          fill="currentColor"
        />
      </div>

      <div className="relative overflow-hidden bg-zinc-900 rounded-2xl p-4 sm:p-5 text-white shadow-lg transition-transform hover:scale-[1.02] duration-300 group">
        <div className="relative z-10 flex flex-col h-full justify-between min-h-[100px]">
          <div className="flex items-center gap-2 text-zinc-400 mb-2">
            <Droplet size={16} className="text-red-500 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Oddana krew
            </span>
          </div>
          <p className="text-3xl font-bold text-white">
            {totalLiters}{' '}
            <span className="text-lg text-zinc-500 font-medium">L</span>
          </p>
        </div>
        <Droplet
          className="absolute -bottom-4 -right-4 w-24 h-24 text-zinc-800  transition-colors rotate-12"
          fill="none"
        />
      </div>
    </div>
  );
};

export default StatisticsCard;
