import { type BaseDashboardCardProps } from '@/types';

export function BaseDashboardCard({ title, children }: BaseDashboardCardProps) {
  return (
    <section className='p-6 border border-zinc-200 shadow-sm rounded-lg bg-zinc-50 flex flex-col'>
      <div className='flex justify-between items-center mb-3'>
        <h3 className='text-xl font-semibold text-zinc-800'>{title}</h3>
      </div>
      {children}
    </section>
  );
}
