import type { Donation } from '@/types';
import { Droplet, Activity, Calendar, Hash } from 'lucide-react';
import { BaseDashboardCard } from './BaseDashboardCard';
import { normalizeType } from '@/utils';

const StatisticsCard = ({ donations }: { donations: Donation[] }) => {
  const statsByType = donations.reduce(
    (acc, curr) => {
      const type = normalizeType(curr.type);
      let volume = 0;
      volume = curr.amount / 1000;
      acc.total += volume;

      if (type === 'krew_pelna') acc.krew_pelna += volume;
      if (type === 'osocze') acc.osocze += volume;
      if (type === 'plytki') acc.plytki_krwi += volume;

      return acc;
    },
    { total: 0, krew_pelna: 0, osocze: 0, plytki_krwi: 0 }
  );

  const totalLiters = parseFloat(statsByType.total.toFixed(2));

  const savedLives = Math.floor((totalLiters / 0.45) * 3);

  const totalDonations = donations.length;
  const lastDonationDate =
    donations.length > 0
      ? new Date(Math.max(...donations.map((d) => new Date(d.date).getTime())))
      : null;

  return (
    <BaseDashboardCard title='Statystyki'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center p-2.5 sm:p-3 bg-red-50/50 rounded-xl border border-red-200'>
          <div className='p-1.5 sm:p-2 bg-red-100 text-red-600 rounded-lg shrink-0 mr-3'>
            <Activity className='w-4 h-4 sm:w-5 sm:h-5' />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm sm:text-base font-medium text-zinc-700'>
              Uratowane życia
            </span>
            <span className='text-lg sm:text-xl font-bold text-red-700 leading-none mt-0.5'>
              {savedLives}
            </span>
          </div>
        </div>

        <div className='flex items-center p-2.5 sm:p-3 bg-red-50/50 rounded-xl border border-red-200'>
          <div className='p-1.5 sm:p-2 bg-red-100 text-red-600 rounded-lg shrink-0 mr-3'>
            <Droplet fill='currentColor' className='w-4 h-4 sm:w-5 sm:h-5' />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm sm:text-base font-medium text-zinc-700'>
              Oddana krew pełna
            </span>
            <span className='text-lg sm:text-xl font-bold text-red-700 leading-none mt-0.5'>
              {statsByType.krew_pelna === 0
                ? '0'
                : statsByType.krew_pelna.toFixed(2)}{' '}
              <span className='text-xs sm:text-sm font-normal text-zinc-900'>
                L
              </span>
            </span>
          </div>
        </div>

        {statsByType.osocze > 0 && (
          <div className='flex items-center p-2.5 sm:p-3 bg-orange-50/50 rounded-xl border border-orange-200'>
            <div className='p-1.5 sm:p-2 bg-orange-100 text-orange-600 rounded-lg shrink-0 mr-3'>
              <Droplet fill='currentColor' className='w-4 h-4 sm:w-5 sm:h-5' />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm sm:text-base font-medium text-zinc-700'>
                Oddane osocze
              </span>
              <span className='text-lg sm:text-xl font-bold text-orange-700 leading-none mt-0.5'>
                {statsByType.osocze === 0 ? '0' : statsByType.osocze.toFixed(2)}{' '}
                <span className='text-xs sm:text-sm font-normal text-zinc-900'>
                  L
                </span>
              </span>
            </div>
          </div>
        )}

        {statsByType.plytki_krwi > 0 && (
          <div className='flex items-center p-2.5 sm:p-3 bg-yellow-50/50 rounded-xl border border-yellow-200'>
            <div className='p-1.5 sm:p-2 bg-yellow-100 text-yellow-600 rounded-lg shrink-0 mr-3'>
              <Droplet fill='currentColor' className='w-4 h-4 sm:w-5 sm:h-5' />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm sm:text-base font-medium text-zinc-700'>
                Oddane płytki krwi
              </span>
              <span className='text-lg sm:text-xl font-bold text-yellow-700 leading-none mt-0.5'>
                {statsByType.plytki_krwi === 0
                  ? '0'
                  : statsByType.plytki_krwi.toFixed(2)}{' '}
                <span className='text-xs sm:text-sm font-normal text-zinc-900'>
                  L
                </span>
              </span>
            </div>
          </div>
        )}

        <div className='flex items-center p-2.5 sm:p-3 bg-zinc-50/50 rounded-xl border border-zinc-200'>
          <div className='p-1.5 sm:p-2 bg-white text-zinc-600 rounded-lg border border-zinc-200 shrink-0 mr-3'>
            <Hash className='w-4 h-4 sm:w-5 sm:h-5' />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm sm:text-base font-medium text-zinc-700'>
              Liczba donacji
            </span>
            <span className='text-lg sm:text-xl font-bold text-zinc-900 leading-none mt-0.5'>
              {totalDonations}
            </span>
          </div>
        </div>

        {totalDonations > 0 && (
          <div className='flex items-center p-2.5 sm:p-3 bg-zinc-50/50 rounded-xl border border-zinc-200'>
            <div className='p-1.5 sm:p-2 bg-white text-zinc-600 rounded-lg border border-zinc-200 shrink-0 mr-3'>
              <Calendar className='w-4 h-4 sm:w-5 sm:h-5' />
            </div>
            <div className='flex flex-col'>
              <span className='text-sm sm:text-base font-medium text-zinc-700'>
                Ostatnia donacja
              </span>
              <span className='text-base sm:text-lg font-bold text-zinc-900 leading-none mt-0.5'>
                {lastDonationDate
                  ? lastDonationDate.toLocaleDateString('pl-PL')
                  : '-'}
              </span>
            </div>
          </div>
        )}
      </div>
    </BaseDashboardCard>
  );
};

export default StatisticsCard;
