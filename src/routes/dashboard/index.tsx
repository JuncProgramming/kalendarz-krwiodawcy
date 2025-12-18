import { createFileRoute, redirect } from '@tanstack/react-router';
import { supabase } from '@/supabaseClient';
import Spinner from '@/components/Spinner';
import { BaseDashboardCard } from '@/components/dashboard/BaseDashboardCard';
import { AddDonationModal } from '@/components/AddDonationModal';
import { ConfirmModal } from '@/components/ConfirmModal';
import { useState, useEffect, useCallback } from 'react';
import { calculateNextDonation } from '@/utils';
import DonationsHistoryCard from '@/components/dashboard/DonationsHistoryCard';
import type { Donation } from '@/types';
import StatusCard from '@/components/dashboard/StatusCard';
import StatisticsCard from '@/components/dashboard/StatisticsCard';
import BadgeGoalCard from '@/components/dashboard/BadgeGoalCard';
import BadgesGalleryCard from '@/components/dashboard/BadgesGalleryCard';
import { toast } from 'react-toastify';
import { MAX_FILE_SIZE } from '@/constants';

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

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [donationToDelete, setDonationToDelete] = useState<string | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [targetDonationType, setTargetDonationType] = useState('krew_pelna');

  const fetchDonations = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('date', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) {
        setDonations(data as Donation[]);
      }
    } catch (error) {
      console.error(error);
      toast.error('Nie udało się pobrać historii donacji.');
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
      calculateNextDonation(
        lastDonation.date,
        lastDonation.type,
        targetDonationType
      )
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
        if (newData.file.size > MAX_FILE_SIZE) {
          toast.error('Plik jest za duży (max. 2 MB)');
          return;
        }

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
      toast.success('Dodano nową donację');
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Nie udało się zapisać donacji. Spróbuj ponownie.');
    }
  };

  const handleDeleteDonation = (id: string) => {
    setDonationToDelete(id);
  };

  const confirmDeleteDonation = async () => {
    if (!donationToDelete) return;

    try {
      const { error } = await supabase
        .from('donations')
        .delete()
        .eq('id', donationToDelete);

      if (error) throw error;

      await fetchDonations();
      toast.success('Donacja została usunięta');
    } catch (error) {
      console.error(error);
      toast.error('Nie udało się usunąć donacji. Spróbuj ponownie');
    } finally {
      setDonationToDelete(null);
    }
  };

  const handleUploadResults = async (id: string, file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error('Plik jest za duży (max. 2 MB)');
      return;
    }

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
      toast.success('Wyniki badań zostały zapisane');
    } catch (error) {
      console.error(error);
      toast.error('Nie udało się przesłać pliku. Spróbuj ponownie.');
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
      toast.error('Nie udało się otworzyć pliku. Spróbuj ponownie');
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
      <h1 className="text-3xl font-bold text-zinc-800">
        Hej,{' '}
        <span className="text-red-600">
          {user?.user_metadata.first_name || 'krwiodawco'}
        </span>
        . Dziękujemy za ratowanie życia.
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <StatusCard
            nextDate={nextDate}
            progress={progress}
            daysRemaining={daysRemaining}
            canDonate={canDonate}
            targetDonationType={targetDonationType}
            onTargetDonationTypeChange={setTargetDonationType}
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
          <BaseDashboardCard title="Odznaki">
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

      <ConfirmModal
        isOpen={donationToDelete !== null}
        onClose={() => setDonationToDelete(null)}
        onConfirm={confirmDeleteDonation}
      />
    </div>
  );
}
