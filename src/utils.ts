export const calculateNextDonation = (lastDonationDateStr: string) => {
  const donationWaitTime = 56;

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
    progress,
  };
};
