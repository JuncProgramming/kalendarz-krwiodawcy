import { type ReactNode } from 'react';

export type DonationType = 'krew_pelna' | 'osocze' | 'plytki';

export type Donation = {
  id: string;
  type: string;
  date: string;
  location: string;
  status: string;
  resultsLink?: string;
};

export type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
};

export type FaqCardProps = {
  question: string;
  children: ReactNode;
};

export type DashboardCardProps = {
  title: string;
  children: ReactNode;
  donations?: Donation[];
};
