import { useMemo } from 'react';
import type { BadgeComponentProps } from '@/types';
import { badges } from '@/data/badges';

export const useBadges = ({ donations, gender }: BadgeComponentProps) => {
  const stats = useMemo(() => {
    const totalLiters = donations.length * 0.45;

    const badgesWithStatus = badges.map((badge) => {
      const threshold = badge.thresholdLiters(gender);
      const isUnlocked = totalLiters >= threshold;
      return { ...badge, isUnlocked, threshold };
    });

    const unlockedBadges = badgesWithStatus.filter((badge) => badge.isUnlocked);
    const nextBadge = badgesWithStatus.find((badge) => !badge.isUnlocked);
    const latestUnlockedBadge = unlockedBadges.at(-1) || null;

    let progress = 0;
    let missingLiters = 0;
    let nextGoalValue = 0;

    if (nextBadge) {
      nextGoalValue = nextBadge.threshold;
      const prevThreshold =
        latestUnlockedBadge ? latestUnlockedBadge.threshold : 0;
      const range = nextGoalValue - prevThreshold;
      const currentProgress = totalLiters - prevThreshold;
      progress = Math.min(Math.max((currentProgress / range) * 100, 0), 100);
      missingLiters = Math.max(0, nextGoalValue - totalLiters);
    } else if (latestUnlockedBadge) {
      progress = 100;
      nextGoalValue = latestUnlockedBadge.threshold;
    }

    return {
      totalLiters,
      badges: badgesWithStatus,
      currentBadge: latestUnlockedBadge,
      nextBadge,
      progress,
      missingLiters: missingLiters.toFixed(2),
      nextGoalValue,
    };
  }, [donations, gender]);

  return stats;
};
