import type { StatusCardProps } from "@/types";

export default function StatusCard({
  daysRemaining,
  nextDate,
  progress,
  canDonate,
}: StatusCardProps) {
  return (
    <section className={`p-6 rounded-lg border shadow-sm transition-all ${
      canDonate 
        ? 'bg-green-50 border-green-200'
        : 'bg-white border-zinc-200'  
    }`}>
      <h2 className={`text-lg font-semibold mb-2 ${
        canDonate ? 'text-green-800' : 'text-zinc-800'
      }`}>
        Twój status
      </h2>

      {canDonate ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-green-600">
              Możesz oddać krew
            </span>
          </div>
          <p className="text-green-700 font-medium">
            Już teraz do punktu krwiodawstwa i uratuj ludzkie życie
          </p>
          <div className="w-full bg-green-200 rounded-full h-2.5 mt-4">
            <div className="bg-green-500 h-2.5 rounded-full w-full"></div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-red-600">
              {daysRemaining} dni
            </span>
            <span className="text-zinc-600 mb-1.5 font-medium">
              do kolejnej donacji krwi pełnej
            </span>
          </div>

          <div className="w-full bg-zinc-100 rounded-full h-2.5 mt-4 overflow-hidden">
            <div
              className="bg-red-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <p className="text-sm text-zinc-500 mt-6 text-right">
            Przewidywana data: <span className="font-medium">{nextDate}</span>
          </p>
        </>
      )}
    </section>
  );
}