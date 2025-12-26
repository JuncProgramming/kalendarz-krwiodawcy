import type { Badge } from '@/types';

export const badges: Badge[] = [
  {
    id: 'zhdk-bronze',
    name: 'Zasłużony Honorowy Dawca Krwi III Stopnia',
    description: 'Oddano 6 litrów (mężczyźni) lub 5 litrów (kobiety) krwi.',
    colors: {
      bg: 'bg-amber-800/10',
      text: 'text-amber-900',
      border: 'border-amber-800',
      progress: 'bg-amber-800'
    },
    thresholdLiters: (gender) => (gender === 'male' ? 6 : 5)
  },
  {
    id: 'zhdk-silver',
    name: 'Zasłużony Honorowy Dawca Krwi II Stopnia',
    description: 'Oddano 12 litrów (mężczyźni) lub 10 litrów (kobiety) krwi.',
    colors: {
      bg: 'bg-zinc-500/15',
      text: 'text-zinc-600',
      border: 'border-zinc-500',
      progress: 'bg-zinc-500'
    },
    thresholdLiters: (gender) => (gender === 'male' ? 12 : 10)
  },
  {
    id: 'zhdk-gold',
    name: 'Zasłużony Honorowy Dawca Krwi I Stopnia',
    description: 'Oddano 18 litrów (mężczyźni) lub 15 litrów (kobiety) krwi.',
    colors: {
      bg: 'bg-yellow-500/15',
      text: 'text-yellow-600',
      border: 'border-yellow-500',
      progress: 'bg-yellow-500'
    },
    thresholdLiters: (gender) => (gender === 'male' ? 18 : 15)
  },
  {
    id: 'hdk-zdzn',
    name: 'Honorowy Dawca Krwi - Zasłużony dla Zdrowia Narodu',
    description: 'Oddano 20 litrów krwi.',
    colors: {
      bg: 'bg-slate-600/15',
      text: 'text-slate-600',
      border: 'border-slate-700',
      progress: 'bg-slate-600'
    },
    thresholdLiters: () => 20
  }
];
