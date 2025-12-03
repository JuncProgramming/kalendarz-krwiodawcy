import type { BadgeComponentProps } from '@/types';
import { Medal } from 'lucide-react';
import { useBadges } from '@/hooks/useBadges';

const BadgesGalleryCard = ({ donations, gender }: BadgeComponentProps) => {
  const { badges } = useBadges({ donations, gender });

  return (
    <div className="grid grid-cols-3 gap-2">
      {badges.map((badge) => {
        const isUnlocked = badge.isUnlocked;

        return (
          <div
            key={badge.id}
            className={`
              relative flex flex-col items-center justify-center p-3 rounded-lg border text-center transition-all
              ${isUnlocked ? `${badge.colors.bg} ${badge.colors.border}` : 'bg-zinc-50 border-zinc-200 grayscale opacity-60'}
            `}>
            <div
              className={`p-2 rounded-full mb-2 ${isUnlocked ? 'bg-white/50' : 'bg-zinc-200'}`}>
              <Medal
                className={`w-6 h-6 ${isUnlocked ? badge.colors.text : 'text-zinc-500'}`}
              />
            </div>

            <div className="space-y-0.5">
              <p
                className={`text-xs font-bold uppercase tracking-wider ${isUnlocked ? badge.colors.text : 'text-zinc-500'}`}>
                {badge.name}
              </p>
              <p className="text-[10px] font-medium text-zinc-500">
                {badge.threshold} litrów
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BadgesGalleryCard;
