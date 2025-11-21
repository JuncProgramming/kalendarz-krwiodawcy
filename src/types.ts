import { type ReactNode } from 'react';

export type DonationType = 'krew_pelna' | 'osocze' | 'plytki';

export type Donation = {
  id: string;
  type: string;
  date: string;
  location: string;
  resultsLink?: string;
};

export type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
};

export type FaqCardProps = {
  question: string;
  children: ReactNode;
};

export type BaseDashboardCardProps = {
  title: string;
  children?: ReactNode;
  donations?: Donation[];
};

export type AddDonationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    date: string;
    type: string;
    location: string;
    file?: File | null;
  }) => void;
};

export type StatusCardProps = {
  daysRemaining: number;
  progress: number;
  nextDate: string;
};

export type DonationsHistoryCardProps = {
  donations: Donation[];
  onClick: () => void;
};
