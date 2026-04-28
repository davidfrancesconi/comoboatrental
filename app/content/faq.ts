// FAQ data — used by the homepage FAQ schema and the /faq route.
// Hand-written in EN and IT; competent translations in RU/AR.
//
// Each Q&A is also exposed as a schema.org Question on the FAQPage so
// Google can show "people also ask" rich results.

import type { Locale } from "../translations";

export type FaqItem = { question: string; answer: string };

export const FAQS: Record<Locale, FaqItem[]> = {
  en: [
    {
      question: "Where do you depart from?",
      answer:
        "From our pontoon on the Lungolago Viale Geno in Como, a five-minute walk from the city centre. For full-day private charters we also collect at any hotel pontoon on the lake — Villa d'Este, Passalacqua, Mandarin Oriental, Il Sereno, Grand Hotel Tremezzo, Villa Serbelloni — at the time you choose.",
    },
    {
      question: "Is the captain included in the price?",
      answer:
        "Yes. Every tour is captained by either Loris or Claudio. Captain, fuel, lake fees, sparkling water, towels for swimming and prosecco aperitivo on returns are all included. There's no per-guest charge up to the boat's capacity (10 for the Venetian taxi, 6 for the mahogany caddy).",
    },
    {
      question: "Do we need any boating experience?",
      answer:
        "No — the captain handles everything. You're a guest on board, not a crew member.",
    },
    {
      question: "What languages do the captains speak?",
      answer:
        "Italian and English fluently. Loris also handles French and Spanish at a conversational level.",
    },
    {
      question: "What happens if the weather is bad?",
      answer:
        "If the captain judges the lake unsafe — high wind, lightning, or low visibility — we reschedule at no charge. Light rain on its own doesn't cancel the tour: the boats have a sliding sunroof, and Lake Como views are spectacular under cloud.",
    },
    {
      question: "Can we swim during the tour?",
      answer:
        "Yes. We carry towels and the captain knows the secret coves. On the longer tours we plan a swim stop into the route; on shorter tours we'll add one if you ask. Lake Como reaches 24°C from late June to mid-September.",
    },
    {
      question: "Are the boats family-friendly?",
      answer:
        "Yes. Children are welcome at any age. We carry life jackets in junior sizes and the captain adjusts the cruising speed for younger guests. Strollers fold and stow on board.",
    },
    {
      question: "Can we visit Villa del Balbianello, Villa Carlotta or Villa d'Este?",
      answer:
        "Villa del Balbianello (FAI, €20) and Villa Carlotta (€12) both have public docks where we can drop you off and collect you 60–90 minutes later. Villa d'Este is a private hotel — we can drop you at its pontoon if you're a guest there or have a restaurant reservation.",
    },
    {
      question: "Is lunch included?",
      answer:
        "Lunch is not included, but on the half-day and full-day tours we book your reservation at one of three trusted lakeside restaurants — Bilacus or Salice Blu in Bellagio, La Vista in Varenna, Crotto del Misto on the eastern shore. You settle directly at the restaurant.",
    },
    {
      question: "How far in advance do we need to book?",
      answer:
        "In summer (June through August) two to three weeks ahead is safe; the calendar fills the closer you get. April, May, September and October usually have same-week availability. November to March we operate by appointment.",
    },
    {
      question: "Can you organise a wedding proposal?",
      answer:
        "Yes — proposals are one of our most-booked occasions. We coordinate the timing, the florist, the photographer, the champagne — you tell us your hotel and the moment you want, we plan the rest. There's no extra coordination fee.",
    },
    {
      question: "Are the boats wheelchair accessible?",
      answer:
        "Boarding at our Como pontoon involves a 30 cm step from the dock onto the boat. We can support a guest with reduced mobility but a power chair stays ashore. Hotel pontoons vary; tell us the hotel and we'll check.",
    },
  ],

  it: [
    {
      question: "Da dove partite?",
      answer:
        "Dal nostro pontile sul Lungolago Viale Geno a Como, a cinque minuti a piedi dal centro città. Per i charter di una giornata intera passiamo a prendervi a qualsiasi pontile d'hotel sul lago — Villa d'Este, Passalacqua, Mandarin Oriental, Il Sereno, Grand Hotel Tremezzo, Villa Serbelloni — all'ora che scegliete voi.",
    },
    {
      question: "Lo skipper è compreso nel prezzo?",
      answer:
        "Sì. Ogni tour è condotto da Loris o Claudio. Skipper, carburante, tasse del lago, acqua frizzante, asciugamani per il bagno e aperitivo con prosecco al ritorno sono tutti compresi. Nessun supplemento a persona fino alla capienza della barca (10 per il taxi veneziano, 6 per il caddy in mogano).",
    },
    {
      question: "Serve esperienza di navigazione?",
      answer: "No — lo skipper si occupa di tutto. Voi siete ospiti a bordo, non equipaggio.",
    },
    {
      question: "Che lingue parlano gli skipper?",
      answer:
        "Italiano e inglese fluentemente. Loris cavolca anche francese e spagnolo a livello conversazionale.",
    },
    {
      question: "Cosa succede se il tempo è brutto?",
      answer:
        "Se lo skipper giudica il lago non navigabile in sicurezza — vento forte, temporali, visibilità scarsa — riprogrammiamo senza costi. La pioggia leggera non cancella il tour: le barche hanno il tetto apribile, e le vedute del Lago di Como sotto le nuvole sono spettacolari.",
    },
    {
      question: "Si può fare il bagno durante il tour?",
      answer:
        "Sì. A bordo abbiamo gli asciugamani e lo skipper conosce le calette nascoste. Nei tour più lunghi pianifichiamo una sosta bagno; nei più brevi la aggiungiamo se ce la chiedete. Il Lago di Como raggiunge i 24°C da fine giugno a metà settembre.",
    },
    {
      question: "Le barche sono adatte alle famiglie?",
      answer:
        "Sì. I bambini sono benvenuti a qualsiasi età. Abbiamo giubbotti di salvataggio in misure junior e lo skipper adatta la velocità per gli ospiti più piccoli. I passeggini si chiudono e si ripongono a bordo.",
    },
    {
      question: "Si possono visitare Villa del Balbianello, Villa Carlotta o Villa d'Este?",
      answer:
        "Villa del Balbianello (FAI, €20) e Villa Carlotta (€12) hanno entrambe pontili pubblici dove possiamo lasciarvi e recuperarvi dopo 60–90 minuti. Villa d'Este è un hotel privato — possiamo sbarcarvi al pontile se siete ospiti lì o avete una prenotazione al ristorante.",
    },
    {
      question: "Il pranzo è compreso?",
      answer:
        "Il pranzo non è compreso, ma nei tour di mezza giornata e di una giornata intera prenotiamo per voi in uno dei tre ristoranti di fiducia sul lago — Bilacus o Salice Blu a Bellagio, La Vista a Varenna, Crotto del Misto sulla sponda est. Pagate direttamente al ristorante.",
    },
    {
      question: "Con quanto anticipo bisogna prenotare?",
      answer:
        "In estate (giugno–agosto) due-tre settimane di anticipo sono sicure; il calendario si riempie più ci si avvicina. Aprile, maggio, settembre e ottobre hanno solitamente disponibilità nella stessa settimana. Da novembre a marzo lavoriamo su appuntamento.",
    },
    {
      question: "Si può organizzare una proposta di matrimonio?",
      answer:
        "Sì — le proposte di matrimonio sono una delle occasioni più richieste. Coordiniamo tempistiche, fioraio, fotografo, champagne — voi ci dite l'hotel e il momento, noi pianifichiamo il resto. Nessun costo extra di coordinamento.",
    },
    {
      question: "Le barche sono accessibili a persone con mobilità ridotta?",
      answer:
        "L'imbarco al nostro pontile di Como prevede uno scalino di 30 cm dal molo alla barca. Possiamo aiutare un ospite con mobilità ridotta, ma una carrozzina elettrica resta a terra. I pontili degli hotel variano; diteci l'hotel e verifichiamo.",
    },
  ],

  ru: [
    { question: "Откуда отправление?", answer: "С нашей пристани на Lungolago Viale Geno в Комо, в пяти минутах от центра. Для полнодневных чартеров — с любой гостиничной пристани на озере." },
    { question: "Шкипер включён в цену?", answer: "Да. Каждый тур ведёт Лорис или Клаудио. Шкипер, топливо, сборы, вода и просекко включены. Нет доплат за гостя до максимальной вместимости." },
    { question: "Нужен опыт?", answer: "Нет — всем управляет шкипер." },
    { question: "На каких языках говорят шкиперы?", answer: "Итальянский и английский свободно. Лорис также французский и испанский." },
    { question: "А если плохая погода?", answer: "Если шкипер сочтёт озеро небезопасным, переносим без оплаты. Лёгкий дождь — не отмена; у лодок раздвижная крыша." },
    { question: "Можно ли купаться?", answer: "Да, шкипер знает уединённые бухты. Полотенца на борту. С конца июня до середины сентября озеро прогревается до 24°C." },
    { question: "Подходит ли для семьи?", answer: "Да, дети любого возраста. Жилеты в детских размерах, скорость регулируется. Коляски складываются и хранятся на борту." },
    { question: "Можно ли посетить виллы?", answer: "Бальбьянелло (FAI €20) и Карлотта (€12) имеют пристани, мы высаживаем и забираем через 60–90 минут. Villa d'Este — частный отель." },
    { question: "Включён ли обед?", answer: "Нет. На полудневных и полнодневных турах бронируем для вас ресторан на берегу. Оплата напрямую в ресторане." },
    { question: "Когда бронировать?", answer: "Лето (июнь–август) — за 2–3 недели. Апрель/май/сентябрь/октябрь обычно ту же неделю." },
    { question: "Помолвка на лодке?", answer: "Да, организуем флориста, фотографа, шампанское и тайминг. Без доплаты за координацию." },
    { question: "Доступность для маломобильных?", answer: "На посадке шаг 30 см. Помогаем гостям с ограниченной мобильностью, но электроколяска остаётся на берегу." },
  ],

  ar: [
    { question: "من أين الانطلاق؟", answer: "من رصيفنا في Lungolago Viale Geno في كومو، خمس دقائق سيراً من وسط المدينة. للجولات اليومية الكاملة نأتي إلى أي رصيف فندقي على البحيرة." },
    { question: "هل الربان مشمول في السعر؟", answer: "نعم. كل جولة يقودها لوريس أو كلاوديو. الربان والوقود والرسوم والمياه والبروسيكو مشمولة. لا رسوم إضافية على الضيف حتى السعة القصوى." },
    { question: "هل نحتاج خبرة؟", answer: "لا، الربان يتولى كل شيء." },
    { question: "ما اللغات؟", answer: "الإيطالية والإنجليزية بطلاقة، ولوريس أيضاً الفرنسية والإسبانية." },
    { question: "ماذا لو كان الطقس سيئاً؟", answer: "إذا اعتبر الربان البحيرة غير آمنة نعيد الجدولة دون رسوم. المطر الخفيف لا يلغي الجولة." },
    { question: "هل يمكن السباحة؟", answer: "نعم، الربان يعرف الخلجان الهادئة. تتراوح حرارة المياه حول 24°م من نهاية يونيو إلى منتصف سبتمبر." },
    { question: "هل القوارب مناسبة للعائلات؟", answer: "نعم، الأطفال مرحب بهم بأي عمر. سترات نجاة بأحجام صغيرة." },
    { question: "هل يمكن زيارة الفيلات؟", answer: "بالبيانيلو (FAI €20) وكارلوتا (€12) لهما أرصفة عامة. ننزلكم ونعود بعد 60–90 دقيقة." },
    { question: "هل الغداء مشمول؟", answer: "لا. لكن في الجولات النصفية واليومية نحجز لكم في مطعم موثوق على البحيرة، تدفعون مباشرة." },
    { question: "متى نحجز؟", answer: "في الصيف قبل 2–3 أسابيع. أبريل/مايو/سبتمبر/أكتوبر عادةً نفس الأسبوع." },
    { question: "هل يمكن تنظيم طلب زواج؟", answer: "نعم، ننسق الزهور والمصور والشمبانيا والتوقيت دون رسوم تنسيق إضافية." },
    { question: "هل القارب مهيأ لمحدودي الحركة؟", answer: "هناك خطوة 30 سم عند الصعود. نساعد محدودي الحركة لكن الكرسي الكهربائي يبقى على الرصيف." },
  ],
};
