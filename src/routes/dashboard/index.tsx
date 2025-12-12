import { createFileRoute, redirect } from '@tanstack/react-router';
import { supabase } from '@/supabaseClient';
import Spinner from '@/components/Spinner';
import { BaseDashboardCard } from '@/components/dashboard/BaseDashboardCard';
import { AddDonationModal } from '@/components/AddDonationModal';
import { useState, useEffect, useCallback } from 'react';
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
    <div className="flex justify-center items-center">
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
  const [isLoading, setIsLoading] = useState(true);

  const fetchDonations = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      if (data) {
        setDonations(data as Donation[]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  const lastDonation = donations[0];
  // If there is a lastDonation, destructure the thing and calculate the next donation date, else default
  const { daysRemaining, nextDate, progress, canDonate } =
    lastDonation ?
      calculateNextDonation(lastDonation.date)
    : {
        daysRemaining: 0,
        nextDate: new Date().toLocaleDateString('pl-PL'),
        progress: 100,
        canDonate: true,
      };

  const handleAddDonation = async (newData: {
    date: string;
    type: string;
    location: string;
    file?: File | null;
  }) => {
    try {
      let resultsUrl = null;

      if (newData.file) {
        const fileExt = newData.file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${Date.now()}_${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('donation-results')
          .upload(filePath, newData.file);

        if (uploadError) throw uploadError;

        resultsUrl = filePath;
      }

      const { error: dbError } = await supabase.from('donations').insert([
        {
          user_id: user.id,
          date: newData.date,
          type: newData.type,
          location: newData.location,
          results_url: resultsUrl,
        },
      ]);

      if (dbError) throw dbError;

      await fetchDonations();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      alert('Wystąpił błąd podczas zapisywania donacji.');
    }
  };

  const handleDeleteDonation = async (id: string) => {
    if (!window.confirm('Czy na pewno chcesz usunąć tę donację?')) return;

    try {
      const { error } = await supabase.from('donations').delete().eq('id', id);

      if (error) throw error;

      await fetchDonations();
    } catch (error) {
      console.error(error);
      alert('Wystąpił błąd podczas usuwania donacji.');
    }
  };

  const handleUploadResults = async (id: string, file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${user.id}/${Date.now()}_${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('donation-results')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from('donations')
        .update({ results_url: filePath })
        .eq('id', id);

      if (updateError) throw updateError;

      await fetchDonations();
    } catch (error) {
      console.error(error);
      alert(`Wystąpił błąd podczas przesyłania pliku.`);
    }
  };

  const handleViewResult = async (path: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('donation-results')
        .createSignedUrl(path, 60);

      if (error) throw error;
      if (data) {
        window.open(data.signedUrl, '_blank');
      }
    } catch (error) {
      console.error(error);
      alert('Wystąpił błąd podczas otwierania pliku.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 md:p-0">
        <h1 className="text-3xl font-bold text-zinc-800">
          Hej,{' '}
          <span className="text-red-600">
            {user?.user_metadata.first_name || 'Krwiodawco'}
          </span>
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
            daysRemaining={daysRemaining}
            canDonate={canDonate}
          />

          <BaseDashboardCard title="Historia donacji">
            <DonationsHistoryCard
              donations={donations}
              onClick={() => setIsModalOpen(true)}
              onDelete={handleDeleteDonation}
              onUpload={handleUploadResults}
              onViewResult={handleViewResult}
            />
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
              Włącz powiadomienia, a damy Ci znać, gdy znów będziesz mógł/mogła
              oddać krew i uratować komuś życie.
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
