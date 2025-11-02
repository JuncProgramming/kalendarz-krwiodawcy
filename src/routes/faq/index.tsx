import { createFileRoute } from '@tanstack/react-router';
import FaqItem from '../../components/FaqItem';
import { faqData } from '../../data/faqData';

export const Route = createFileRoute('/faq/')({
  component: FaqComponent,
});

function FaqComponent() {
  return (
    <div className="w-full space-y-6 flex-col flex items-center">
      <h1 className="text-3xl text-center font-semibold text-zinc-700">
        Jak zacząć oddawać krew?
      </h1>
      <div className="w-full max-w-3xl space-y-3">
        {faqData.map((item) => (
          <FaqItem key={item.id} question={item.question}>
            {item.answer}
          </FaqItem>
        ))}
      </div>
    </div>
  );
}
