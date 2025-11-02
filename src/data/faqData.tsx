export const faqData = [
  {
    id: 1,
    question: 'Jak przygotować się do pierwszego oddania krwi?',
    answer: (
      <>
        <p>Przed pierwszym oddaniem krwi warto się odpowiednio przygotować:</p>
        <ul className="list-disc list-inside space-y-2 mt-3">
          <li>Wypij co najmniej 2 szklanki wody przed donacją</li>
          <li>Zjedz lekki posiłek 2-3 godziny przed oddaniem krwi</li>
          <li>Wyśpij się - minimum 6-8 godzin snu</li>
          <li>Weź ze sobą dowód osobisty</li>
          <li>Unikaj alkoholu 24 godziny przed donacją</li>
        </ul>
      </>
    ),
  },
  {
    id: 2,
    question: 'Jakie są przeciwwskazania do oddania krwi?',
    answer: (
      <p>
        Lista przeciwwskazań jest długa i obejmuje m.in. aktywne infekcje,
        niedawne tatuaże, oraz niektóre choroby przewlekłe.
      </p>
    ),
  },
  {
    id: 3,
    question: 'Ile trwa oddawanie krwi?',
    answer: (
      <p>
        Samo pobranie krwi pełnej trwa zwykle od 5 do 10 minut. Cała wizyta,
        wraz z rejestracją i badaniem, zajmuje około 45-60 minut.
      </p>
    ),
  },
];
