export const faqData = [
  {
    id: 1,
    question: 'Kto może zostać dawcą krwi?',
    answer: (
      <>
        <p>Dawcą krwi mogą zostać osoby, które:</p>
        <ul className="list-disc list-inside space-y-2 mt-3">
          <li>Mają od 18 do 65 lat</li>
          <li>Ważą co najmniej 50 kilogramów</li>
          <li>
            U których w ciągu ostatnich 4 miesięcy nie wykonano tatuażu,
            przekłucia uszu lub innych części ciała, akupunktury o ile nie
            została wykonana przez wykwalifikowaną osobę przy użyciu jałowych
            jednorazowych igieł,
          </li>
          <li>
            W ciągu ostatnich 4 miesięcy nie miały wykonanych żadnych zabiegów
            operacyjnych, endoskopowych i innych diagnostycznych badań (np.
            gastroskopii, panendoskopii, artroskopii, laparoskopii),
          </li>
          <li>
            W ciągu ostatnich 4 miesięcy nie były leczone krwią i preparatami
            krwiopochodnymi.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 2,
    question: 'Czy muszę znać swoją grupę krwi?',
    answer: (
      <p>
        Nie, absolutnie <strong> nie musisz</strong>. Twoja grupa krwi zostanie
        dokładnie zbadana i oznaczona w ośrodku dokonującym pobrania.
      </p>
    ),
  },
  {
    id: 3,
    question: 'Ile trwa cała wizyta w centrum krwiodawstwa?',
    answer: (
      <>
        <p>Samo pobranie krwi pełnej trwa zwykle od 5 do 10 minut.</p>
        <p className="mt-2">
          Musisz jednak pamiętać o tym, żeby doliczyć czas na cały proces:
          rejestrację, wypełnienie ankiety, badanie wstępne, wywiad lekarski
          oraz odpoczynek po donacji.
        </p>
        <p className="mt-2">
          Realistycznie, na całą wizytę warto zarezerwować sobie{' '}
          <strong>około 45-60 minut</strong>.
        </p>
      </>
    ),
  },
  {
    id: 4,
    question: 'Jak wygląda proces oddawania krwi krok po kroku?',
    answer: (
      <>
        <p>Proces jest bardzo prosty i przebiega w kilku etapach:</p>
        <ol className="list-decimal list-inside space-y-2 mt-3">
          {' '}
          <li>
            {' '}
            <strong>Szatnia:</strong> Pozostawienie odzieży wierzchniej w
            wyznaczonym miejscu.{' '}
          </li>{' '}
          <li>
            {' '}
            <strong>Rejestracja:</strong> Weryfikacja danych osobowych dawcy na
            podstawie dokumentu tożsamości.{' '}
          </li>{' '}
          <li>
            {' '}
            <strong>Ankieta:</strong> Wypełnienie kwestionariusza wywiadu
            epidemiologicznego i ankiety dotyczącej stanu zdrowia.{' '}
          </li>{' '}
          <li>
            {' '}
            <strong>Badanie wstępne:</strong> Przeprowadzenie standardowego
            pobrania próbki krwi w celu dokonania analizy laboratoryjnej i oceny
            jej zdatności do donacji.{' '}
          </li>{' '}
          <li>
            {' '}
            <strong>Kwalifikacja lekarska:</strong> Przeprowadzenie wywiadu
            medycznego przez lekarza, pomiar ciśnienia tętniczego i ostateczna
            kwalifikacja do oddania krwi.{' '}
          </li>{' '}
          <li>
            {' '}
            <strong>Donacja:</strong> Samodzielna dezynfekcja skóry w zgięciu
            łokciowym, następnie zajęcie miejsca na fotelu donacyjnym i pobranie
            jednostki krwi (450 ml) w czasie około 5-10 minut.{' '}
          </li>{' '}
          <li>
            {' '}
            <strong>Odpoczynek:</strong> Zalecany co najmniej 15-minutowy
            odpoczynek po donacji, odbiór posiłku regeneracyjnego oraz (na
            życzenie) wydanie zaświadczenia usprawiedliwiającego nieobecność w
            pracy lub placówce edukacyjnej.{' '}
          </li>{' '}
        </ol>
      </>
    ),
  },
  {
    id: 5,
    question: 'Czy oddawanie krwi jest bolesne?',
    answer: (
      <>
        <p>
          Jedyny odczuwalny moment to krótkotrwały dyskomfort przy wprowadzaniu
          igły, który jest porównywalny ze standardowym pobraniem krwi do badań
          laboratoryjnych. Właściwy proces donacji jest już całkowicie
          bezbolesny.
        </p>
      </>
    ),
  },
  {
    id: 6,
    question: 'Czy mogę się czymś zarazić? Czy sprzęt jest sterylny?',
    answer: (
      <>
        <p>
          <strong>Nie ma absolutnie żadnej możliwości zarażenia się.</strong>
        </p>
        <p className="mt-2">
          Cały sprzęt używany do pobierania krwi (igły, pojemniki, przewody)
          jest <strong>sterylny i jednorazowego użytku</strong>. Zestaw jest
          otwierany przy Tobie i utylizowany natychmiast po zakończeniu donacji.
        </p>
        <p className="mt-2">Oddawanie krwi jest w 100% bezpieczne dla dawcy.</p>
      </>
    ),
  },
  {
    id: 7,
    question: 'Komu przysługuje tytuł Honorowego Dawcy Krwi?',
    answer: (
      <>
        <p>
          "Honorowy Dawca Krwi" to tytuł, który przysługuje każdej osobie, która
          przynajmniej raz dobrowolnie i bezpłatnie oddała krew lub jej
          składniki.
        </p>
      </>
    ),
  },

  {
    id: 8,
    question: 'Komu przysługuje tytuł Zasłużonego Honorowego Dawcy Krwi?',
    answer: (
      <>
        <p>
          "Zasłużony Honorowy Dawca Krwi" to tytuł nadawany przez Polski
          Czerwony Krzyż jako najwyższa forma uznania dla osób, które regularnie
          i przez długi czas oddają krew. Jest to tytuł wielostopniowy, zależny
          od łącznej objętości oddanej krwi (lub jej składników w przeliczeniu).
        </p>
        <h3 className="font-semibold mt-3 mb-1">Stopnie tytułu ZHDK:</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>III stopnia:</strong> 5 litrów (Kobiety) / 6 litrów
            (Mężczyźni)
          </li>
          <li>
            <strong>II stopnia:</strong> 10 litrów (Kobiety) / 12 litrów
            (Mężczyźni)
          </li>
          <li>
            <strong>I stopnia:</strong> 15 litrów (Kobiety) / 18 litrów
            (Mężczyźni)
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 9,
    question: 'Co przysługuje mi po oddaniu krwi?',
    answer: (
      <>
        <p>Po donacji dawcy przysługuje:</p>
        <ul className="list-disc list-inside space-y-2 mt-3">
          <li>
            Tytuł „Honorowego Dawcy Krwi” oraz legitymacja „Honorowego Dawcy
            Krwi” wydana przez jednostkę organizacyjną publicznej służby krwi, w
            której dawca krwi oddał krew pełną lub jej składniki.
          </li>
          <li>Posiłek regeneracyjny o wartości 4500 kcal</li>
          <li>
            Zwolnienie od pracy oraz zwolnienie od wykonywania czynności
            służbowych w dniu, w którym oddaje krew, oraz w dniu następnym
          </li>
          <li>
            Ulga podatkowa z tytułu darowizn przekazanych na cele krwiodawstwa.
          </li>
          <li>Zwrot kosztów dojazdu do najbliższego punktu poboru krwi.</li>
          <li>Bezpłatne wyniki badań laboratoryjnych.</li>
          <li>Karta identyfikacyjna grupy krwi (KrewKarta).</li>
        </ul>
      </>
    ),
  },
  {
    id: 10,
    question: 'Jakie są przywileje dla Zasłużonych Honorowych Dawców Krwi?',
    answer: (
      <>
        <p className="mt-2">
          Zostanie ZHDK wiąże się z następującymi przywilejami:
        </p>
        <ul className="list-disc list-inside space-y-2 mt-3">
          <li>
            korzystanie z usług farmaceutycznych udzielanych w aptekach poza
            kolejnością.
          </li>
          <li>
            Korzystanie ze świadczeń opieki zdrowotnej poza kolejnością, które
            co do zasady powinny zostać udzielone w dniu zgłoszenia,
          </li>
          <li>
            Bezpłatne (do wysokości limitu finansowania) zaopatrzenie w leki
            objęte wykazem leków refundowanych oraz wykazem leków, które można
            stosować w związku z oddawaniem krwi (preparaty witaminowe, kwasu
            foliowego i żelaza) - na podstawie recepty i po okazaniu legitymacji
            Zasłużonego Honorowego Dawcy Krwi,
          </li>
          <li>
            Bezpłatne (lub ulgowe) przejazdy komunikacją miejską (w zależności
            od miasta).
          </li>
        </ul>
      </>
    ),
  },
];
