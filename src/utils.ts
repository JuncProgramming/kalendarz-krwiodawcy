import { TAX_RELIEF_PER_LITER, TYPE_VOLUME_MULTIPLIER } from './constants';
import type { Donation } from './types';

export const normalizeType = (type: string) => {
  if (type === 'Krew pełna' || type === 'krew_pelna') return 'krew_pelna';
  if (type === 'Osocze' || type === 'osocze') return 'osocze';
  if (type === 'Płytki krwi' || type === 'plytki') return 'plytki';
  return 'krew_pelna';
};

export const calculateNextDonation = (
  lastDonationDateStr: string,
  lastDonationType: string = 'Krew pełna',
  targetDonationType: string = 'Krew pełna'
) => {
  const lastType = normalizeType(lastDonationType);
  const targetType = normalizeType(targetDonationType);

  let donationWaitTime = 56;

  if (lastType === 'krew_pelna') {
    if (targetType === 'krew_pelna') {
      donationWaitTime = 56;
    } else {
      donationWaitTime = 28;
    }
  } else if (lastType === targetType) {
    donationWaitTime = 14;
  } else {
    donationWaitTime = 2;
  }

  const lastDate = new Date(lastDonationDateStr);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextDate = new Date(lastDate);
  nextDate.setDate(lastDate.getDate() + donationWaitTime);
  nextDate.setHours(0, 0, 0, 0);

  const timeDifference = nextDate.getTime() - today.getTime();
  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  const daysElapsed = donationWaitTime - daysRemaining;
  const progress = Math.min(
    Math.max((daysElapsed / donationWaitTime) * 100, 0),
    100
  );

  return {
    daysRemaining: daysRemaining > 0 ? daysRemaining : 0,
    canDonate: daysRemaining <= 0,
    nextDate: nextDate.toLocaleDateString('pl-PL'),
    progress
  };
};

export const calculateTaxRelief = (donations: Donation[], year: number) => {
  const yearDonations = donations.filter(
    (donation) => new Date(donation.date).getFullYear() === year
  );

  const totalAmount = yearDonations.reduce((acc, curr) => {
    const type = normalizeType(
      curr.type
    ) as keyof typeof TYPE_VOLUME_MULTIPLIER;

    let volume = 0;
    if (curr.amount) {
      volume = curr.amount / 1000;
    } else {
      volume = TYPE_VOLUME_MULTIPLIER[type] || 0;
    }

    return acc + volume * TAX_RELIEF_PER_LITER;
  }, 0);

  return {
    amount: Math.round(totalAmount * 100) / 100,
    donationCount: yearDonations.length
  };
};

export const getDonationsWordForm = (count: number) => {
  const absCount = Math.floor(Math.abs(count));

  const lastTwoDigits = absCount % 100;
  const lastDigit = absCount % 10;

  if (absCount === 1) {
    return 'donacja';
  }

  if (lastTwoDigits >= 12 && lastTwoDigits <= 14) {
    return 'donacji';
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return 'donacje';
  }

  return 'donacji';
};
