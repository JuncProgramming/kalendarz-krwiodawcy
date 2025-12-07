import { createFileRoute, redirect } from '@tanstack/react-router';
import { supabase } from '@/supabaseClient';
import Spinner from '@/components/Spinner';
import { BaseDashboardCard } from '@/components/dashboard/BaseDashboardCard';
import { AddDonationModal } from '@/components/AddDonationModal';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { calculateNextDonation } from '@/utils';
import DonationsHistoryCard from '@/components/dashboard/DonationsHistoryCard';
import type { Donation } from '@/types';
import StatusCard from '@/components/dashboard/StatusCard';
import StatisticsCard from '@/components/dashboard/StatisticsCard';
import BadgeGoalCard from '@/components/dashboard/BadgeGoalCard';
import BadgesGalleryCard from '@/components/dashboard/BadgesGalleryCard';

export const Route = createFileRoute('/dashboard/')({
  beforeLoad: async ({ location }) => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      throw redirect({
        to: '/login',
        search: { redirect: location.href },
      });
    }
    return { session };
  },
  pendingComponent: () => (
    <div className="flex justify-center items-center h-screen">
      <Spinner size="lg" />
    </div>
  ),
  component: Dashboard,
});

function Dashboard() {
  const { session } = Route.useRouteContext();
  const user = session.user;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donations, setDonations] = useState<Donation[]>([]);

  const lastDonation = donations[0];
  const { daysRemaining, nextDate, progress } =
    lastDonation ?
      calculateNextDonation(lastDonation.date)
    : {
        daysRemaining: 0,
        nextDate: new Date().toLocaleDateString('pl-PL'),
        progress: 100,
      };

  const handleAddDonation = (newData: any) => {
    const newDonation = {
      id: Math.random().toString(),
      ...newData,
    };
    setDonations([newDonation, ...donations]);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-0">
        <h1 className="text-3xl font-bold text-zinc-800">
          Hej,{' '}
          <span className="text-red-600">{user?.user_metadata.first_name}</span>
          . Dziękujemy za ratowanie życia.
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 text-white font-semibold py-2.5 px-6 rounded-md hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm">
          <Plus size={20} />
          Dodaj donację
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StatusCard
            nextDate={nextDate}
            progress={progress}
            daysRemaining={daysRemaining}></StatusCard>

          <BaseDashboardCard title="Historia donacji">
            <DonationsHistoryCard
              donations={donations}
              onClick={() => setIsModalOpen(true)}></DonationsHistoryCard>
          </BaseDashboardCard>
        </div>

        <div className="space-y-6">
          <BaseDashboardCard title="Odznaki ZHDK">
            <BadgeGoalCard
              donations={donations}
              gender={user?.user_metadata?.gender}
            />
            <div className="my-6 border-t border-zinc-100"></div>
            <BadgesGalleryCard
              donations={donations}
              gender={user?.user_metadata?.gender}
            />
          </BaseDashboardCard>

          <BaseDashboardCard title="Statystyki">
            <StatisticsCard donations={donations} />
          </BaseDashboardCard>

          <BaseDashboardCard title="Przypomnienia">
            <p className="text-zinc-600 mb-6 text-sm">
              Włącz powiadomienia, a damy Ci znać, gdy znbów będziesz mógł/mogła
              oddać krew i uratować komuś życie
            </p>
            <button className="w-full bg-zinc-800 text-white font-medium py-2.5 rounded-md hover:bg-zinc-900 transition-colors text-sm">
              Włącz przypomnienia
            </button>
          </BaseDashboardCard>
        </div>
      </div>

      <AddDonationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddDonation}
      />
    </div>
  );
}
