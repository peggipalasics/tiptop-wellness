/* =============================================================================
   ADATOK — ezt az egy fájlt kell szerkeszteni, ha adat változik.

   A legtöbb adat a házi "Programajánló" PDF-ből származik, ezért megerősítettnek
   számít. Ahol `kitoltendo: true` maradt, ott a weboldalon sárga
   "Ellenőrizendő adat" jelzés látszik — állítsd `false`-ra, ha rendben van.
   ============================================================================= */

const ADATOK = {

  /* --- Kapcsolat ----------------------------------------------------------- */
  kapcsolat: {
    kitoltendo: false,
    telefon: '+36 70 366 2079',
    telefonHivas: '+36703662079',
    email: 'zalakarosiapartman@gmail.com',
    uzemelteto: '',                    // üres: nem jelenik meg a weboldalon
    beosztas: '',
    nyelvek: [],                       // üres: a "Beszélt nyelvek" sor nem jelenik meg
    ntak: 'MA21006304',
  },

  /* --- Cím ----------------------------------------------------------------- */
  cim: {
    kitoltendo: false,
    utca: 'Gyógyfürdő tér 6., 3. emelet',
    epulet: 'MenDan Apartmanház',
    varos: 'Zalakaros',
    psz: '8749',
    orszag: 'HU',
    lat: 46.5556,                      // közelítő — pontosítsd Google Mapsen
    lon: 17.1283,
    terkepLink: 'https://www.google.com/maps/search/?api=1&query=MenDan+Apartmanh%C3%A1z+Zalakaros+Gy%C3%B3gyf%C3%BCrd%C5%91+t%C3%A9r+6',
  },

  /* --- Alapadatok ---------------------------------------------------------- */
  alap: {
    kitoltendo: false,
    maxFo: 4,
    haloszoba: 1,
    furdoszoba: 1,
    emelet: 3,
    meret: 32,                         // m²
    legteru: true,                     // egy légterű: ágy és kanapé egy helyiségben
    terasz: true,
    furdoTavolsag: 50,                 // méter a gyógyfürdő bejáratától
    erkezes: '14:00',
    tavozas: '10:30',
    minEjszaka: null,                  // nincs megerősítve — ha van szabály, írd be (pl. 2)
    allat: null,                       // nincs megerősítve — true vagy false, ha tudod
    dohanyzas: 'terasz',               // 'terasz' | false
    lift: 2,                           // panorámalift
    akadalymentes: true,
    kisagy: true,
    leesesgatlo: false,
    recepcio24: true,
  },

  /* --- Wellness ------------------------------------------------------------ */
  wellness: {
    medenceHo: 29,                     // °C
    medenceMelyseg: '110–140 cm',
    medenceNyitas: '9:00',
    medenceZaras: '20:00',
    szaunaIdok: ['10:00–12:00', '15:00–17:00'],
    szomszedKedvezmeny: 20,            // % a MenDan Magic Spa & Wellness Hotelben
    szomszedNev: 'MenDan Magic Spa & Wellness Hotel',
    fizetos: ['masszazs', 'bar'],      // a házban, külön díjért
    azEpuletben: ['abc', 'pizzeria'],  // a földszinten
  },

  /* --- Árak ---------------------------------------------------------------- */
  /* A Programajánlóban nincs árlista, ezek még a portálokról vett példaértékek.
     Amíg kitoltendo: true, az árlista NEM jelenik meg, helyette "kérjen
     ajánlatot" szöveg látszik. Írd át a tényleges árakra, és állítsd false-ra. */
  arak: {
    kitoltendo: true,
    penznem: 'Ft',
    idoszakok: [
      { kulcs: 'fo',       ar: 27000 },
      { kulcs: 'kozep',    ar: 23000 },
      { kulcs: 'alacsony', ar: 21000 },
    ],
    ifa: 600,                          // idegenforgalmi adó Ft/fő/éj 18 év felett
  },

  /* --- Hirdetési oldalak --------------------------------------------------- */
  portalok: [
    { nev: 'Booking.com', url: 'https://www.booking.com/hotel/hu/tip-top-wellness-apartman-zalakaros.hu.html' },
    { nev: 'Airbnb',      url: 'https://www.airbnb.hu/rooms/51721828' },
    { nev: 'Szállás.hu',  url: 'https://szallas.hu/tip-top-wellness-apartman-zalakaros' },
  ],

  /* --- Galéria -------------------------------------------------------------- */
  /* Tedd a képeket az images/ mappába ezekkel a fájlnevekkel (vagy írd át a
     listát a sajátjaidra). Amíg egy kép hiányzik, helykitöltő látszik.       */
  heroKep: 'images/szoba.jpg',       // a nagy nyitókép
  heroKep2: 'images/medence.jpg',    // a kisebb kép a sarkában

  galeria: [
    { fajl: 'images/szoba.jpg',        cimkeKulcs: 'gal.room' },
    { fajl: 'images/lakoter.jpg',      cimkeKulcs: 'gal.living' },
    { fajl: 'images/konyha.jpg',       cimkeKulcs: 'gal.kitchen' },
    { fajl: 'images/konyha-szoba.jpg', cimkeKulcs: 'gal.kitchenRoom' },
    { fajl: 'images/furdoszoba.jpg',   cimkeKulcs: 'gal.bath' },   // ← még hiányzik a kép
    { fajl: 'images/medence.jpg',      cimkeKulcs: 'gal.pool' },
    { fajl: 'images/recepcio.jpg',     cimkeKulcs: 'gal.reception' },
    { fajl: 'images/folyoso.jpg',      cimkeKulcs: 'gal.corridor' },
    { fajl: 'images/apartmanhaz.jpg',  cimkeKulcs: 'gal.house' },
    { fajl: 'images/parkolo.jpg',      cimkeKulcs: 'gal.parking' },
    { fajl: 'images/termalto.jpg',     cimkeKulcs: 'gal.lake' },
    { fajl: 'images/fekves.jpg',       cimkeKulcs: 'gal.aerial' },
  ],

  /* --- Naptár -------------------------------------------------------------- */
  naptar: {
    aktiv: false,                      // ← true, ha a data/availability.json valódi foglalásokat tartalmaz
    honapokElore: 12,
    adatUrl: 'data/availability.json',
  },

  /* =========================================================================
     PROGRAMOK
     A házi Programajánló alapján, de saját szöveggel: a leírások nem az
     üzemeltetők anyagából vannak átmásolva, csak a tények (távolság, miről
     szól, hivatalos oldal) kerültek át. Így nincs szerzői jogi gond, és a
     Google sem bünteti az oldalt másolt tartalomért.

     tav: kilométer a szállástól (0 = pár perc séta)
     link: csak hivatalos weboldal. Telefonszámokat szándékosan nem teszünk
           ki — a nyomtatott, apartmanban hagyott füzetbe valók.
     ========================================================================= */
  programok: [
    {
      nev: 'Termáltó és Ökopart', tav: 0, link: '',
      leiras: {
        hu: 'Közvetlenül az apartmanház mögött. 12 900 m² -es tó, 15 méteres kilátótorony, 21 méteres csúszdatorony, vízi tipegő, játszótér és szabadtéri fitneszpark.',
        de: 'Direkt hinter dem Apartmenthaus. Ein 12 900 m² großer See mit 15-Meter-Aussichtsturm, 21-Meter-Rutschenturm, Wassertrittsteinen, Spielplatz und Freiluft-Fitnesspark.',
        en: 'Directly behind the apartment house. A 12,900 m² lake with a 15-metre lookout tower, a 21-metre slide tower, stepping stones across the water, a playground and an outdoor fitness park.',
        cs: 'Přímo za apartmánovým domem. Jezero o ploše 12 900 m² s 15metrovou rozhlednou, 21metrovou skluzavkovou věží, vodními šlapáky, hřištěm a venkovním fitness parkem.',
        ro: 'Chiar în spatele clădirii. Un lac de 12 900 m² cu turn de observație de 15 metri, turn de tobogane de 21 de metri, pietre de trecere peste apă, loc de joacă și parc de fitness în aer liber.',
        sk: 'Priamo za apartmánovým domom. Jazero s plochou 12 900 m², 15-metrová rozhľadňa, 21-metrová šmykľavková veža, vodné šliapadlá, ihrisko a vonkajší fitness park.',
      }
    },
    {
      nev: 'Égerösvény', tav: 0, link: '',
      leiras: {
        hu: 'Tanösvény a Termáltónál, égeres élőhelyen át. Több állomása akadálymentes, és Braille-írásos táblák is kikerültek.',
        de: 'Lehrpfad am Thermalsee durch einen Erlenbruch. Mehrere Stationen sind barrierefrei, es gibt auch Tafeln in Brailleschrift.',
        en: 'A nature trail at the thermal lake through alder wetland. Several stations are step-free, and some signs are in Braille.',
        cs: 'Naučná stezka u termálního jezera olšovým mokřadem. Několik zastávek je bezbariérových, některé tabule jsou i v Braillově písmu.',
        ro: 'Traseu tematic la lacul termal, prin zona umedă cu arini. Mai multe stații sunt accesibile, iar unele panouri sunt în Braille.',
        sk: 'Náučný chodník pri termálnom jazere cez jelšový mokraď. Viaceré zastávky sú bezbariérové, niektoré tabule sú aj v Braillovom písme.',
      }
    },
    {
      nev: 'Dotto kisvonat', tav: 0.25, link: 'http://www.dotto-zalakaros.hu/',
      leiras: {
        hu: 'Megálló a Tourinform irodánál. Az 50 perces városnéző kör 11 km, a jeggyel bármelyik megállónál le lehet szállni, és később ugyanazzal visszaülni. Borkóstoló kalandbusz és kis-balatoni kirándulás is indul.',
        de: 'Haltestelle beim Tourinform-Büro. Die 50-minütige Stadtrundfahrt ist 11 km lang; mit demselben Ticket kann man an jeder Haltestelle aussteigen und später wieder zusteigen. Es gibt auch einen Weintour-Bus und einen Ausflug zum Kleinen Balaton.',
        en: 'The stop is by the Tourinform office. The 50-minute sightseeing loop covers 11 km, and the ticket lets you get off at any stop and rejoin later. There is also a wine-tasting bus tour and a Little Balaton excursion.',
        cs: 'Zastávka u kanceláře Tourinform. Padesátiminutový okruh měří 11 km, se stejnou jízdenkou lze vystoupit na kterékoli zastávce a později zase nastoupit. Jezdí i degustační autobus a výlet k Malému Balatonu.',
        ro: 'Stația este lângă biroul Tourinform. Turul de 50 de minute acoperă 11 km, iar biletul permite coborârea la orice stație și reurcarea mai târziu. Există și un tur cu degustare de vinuri și o excursie la Balatonul Mic.',
        sk: 'Zastávka pri kancelárii Tourinform. Päťdesiatminútový okruh meria 11 km, s tým istým lístkom možno vystúpiť na ktorejkoľvek zastávke a neskôr znova nastúpiť. Premáva aj degustačný autobus a výlet k Malému Balatonu.',
      }
    },
    {
      nev: 'Kerékpáros centrum', tav: 0.25, link: '',
      leiras: {
        hu: 'A Tourinform irodánál felnőtt és gyermekkerékpár is bérelhető. Zalakarosról nyolc kijelölt kerékpáros útvonal indul, köztük a Kis-Balaton és Keszthely felé.',
        de: 'Beim Tourinform-Büro lassen sich Räder für Erwachsene und Kinder mieten. Von Zalakaros führen acht ausgeschilderte Radrouten weg, unter anderem Richtung Kleiner Balaton und Keszthely.',
        en: 'Adult and children’s bicycles can be hired at the Tourinform office. Eight signed cycling routes start from Zalakaros, including ones towards the Little Balaton and Keszthely.',
        cs: 'U kanceláře Tourinform si lze půjčit kola pro dospělé i děti. Ze Zalakarosu vede osm značených cyklotras, mimo jiné k Malému Balatonu a do Keszthely.',
        ro: 'La biroul Tourinform se pot închiria biciclete pentru adulți și copii. Din Zalakaros pornesc opt trasee ciclabile marcate, printre care spre Balatonul Mic și Keszthely.',
        sk: 'Pri kancelárii Tourinform si možno požičať bicykle pre dospelých aj deti. Zo Zalakarosu vedie osem značených cyklotrás, okrem iného k Malému Balatonu a do Keszthely.',
      }
    },
    {
      nev: 'Kertmozi', tav: 0.8, link: '',
      leiras: {
        hu: 'Zalakaros kertmozija 1976 óta működik, a Szőlő utcában. A nézőtér fedett, így eső sem viszi el az estét.',
        de: 'Das Gartenkino von Zalakaros gibt es seit 1976, in der Szőlő utca. Der Zuschauerraum ist überdacht, Regen macht den Abend also nicht zunichte.',
        en: 'Zalakaros’s garden cinema has been running since 1976, on Szőlő utca. The seating is covered, so rain doesn’t end the evening.',
        cs: 'Zahradní kino v Zalakarosu funguje od roku 1976, v ulici Szőlő. Hlediště je zastřešené, takže déšť večer nezkazí.',
        ro: 'Cinematograful în aer liber din Zalakaros funcționează din 1976, pe strada Szőlő. Tribuna este acoperită, așa că ploaia nu strică seara.',
        sk: 'Záhradné kino v Zalakarose funguje od roku 1976, na ulici Szőlő. Hľadisko je zastrešené, takže dážď večer nepokazí.',
      }
    },
    {
      nev: 'Csiga-túra tanösvény', tav: 2.5, link: '',
      leiras: {
        hu: 'Kiépített sétaút a Zalakaros feletti parkerdőben, hullámpadokkal és hangostáblával. Lassú, ráérős családi séta — ahogy a neve is ígéri.',
        de: 'Ausgebauter Spazierweg im Parkwald über Zalakaros, mit Wellenbänken und Hörtafel. Ein langsamer, gemächlicher Familienspaziergang — wie der Name verspricht.',
        en: 'A made-up walking trail in the park forest above Zalakaros, with wave-shaped benches and an audio board. A slow, unhurried family walk, as the name (“snail tour”) promises.',
        cs: 'Upravená vycházková stezka v parkovém lese nad Zalakarosem, s vlnitými lavicemi a zvukovou tabulí. Pomalá, poklidná rodinná procházka — jak název slibuje.',
        ro: 'Traseu de plimbare amenajat în pădurea-parc de deasupra Zalakarosului, cu bănci ondulate și panou sonor. O plimbare lentă, fără grabă, în familie — așa cum promite numele.',
        sk: 'Upravený vychádzkový chodník v parkovom lese nad Zalakarosom, s vlnitými lavicami a zvukovou tabuľou. Pomalá, pokojná rodinná prechádzka — ako sľubuje názov.',
      }
    },
    {
      nev: 'Erdészkilátó', tav: 2.5, link: '',
      leiras: {
        hu: 'A Park utca folytatásában, a parkerdő szélén. A toronyból tiszta időben ellátni a Kis-Balatonig, Keszthelyig és a Badacsonyig. A tövében a Kilátó Borozó.',
        de: 'In der Verlängerung der Park utca, am Rand des Parkwaldes. Bei klarem Wetter reicht der Blick bis zum Kleinen Balaton, nach Keszthely und zum Badacsony. Am Fuß liegt die Weinstube Kilátó.',
        en: 'At the end of Park utca, on the edge of the park forest. In clear weather the tower looks out as far as the Little Balaton, Keszthely and Badacsony. The Kilátó wine bar sits at its foot.',
        cs: 'V prodloužení ulice Park, na okraji parkového lesa. Za jasného počasí dohlédnete až k Malému Balatonu, do Keszthely a na Badacsony. Pod věží stojí vinárna Kilátó.',
        ro: 'În prelungirea străzii Park, la marginea pădurii-parc. Pe vreme senină, din turn se vede până la Balatonul Mic, Keszthely și Badacsony. La poalele lui se află crama Kilátó.',
        sk: 'V predĺžení ulice Park, na okraji parkového lesa. Za jasného počasia dovidíte až k Malému Balatonu, do Keszthely a na Badacsony. Pod vežou stojí vináreň Kilátó.',
      }
    },
    {
      nev: 'Sétarepülés — Zalakarosi repülőtér', tav: 3.5, link: 'https://www.setarepuleszalakaros.hu/',
      leiras: {
        hu: 'Családias kisrepülőtér. A levegőből látszik a Kis-Balaton, a Balaton, a keszthelyi Festetics-kastély és a hévízi tó.',
        de: 'Ein familiärer kleiner Flugplatz. Aus der Luft sieht man den Kleinen Balaton, den Balaton, das Schloss Festetics in Keszthely und den Heilsee von Hévíz.',
        en: 'A small, family-run airfield. From the air you can see the Little Balaton, Lake Balaton, Festetics Palace in Keszthely and the thermal lake at Hévíz.',
        cs: 'Rodinné malé letiště. Ze vzduchu je vidět Malý Balaton, Balaton, zámek Festetics v Keszthely i jezero v Hévízu.',
        ro: 'Un mic aerodrom de familie. Din aer se văd Balatonul Mic, Balatonul, palatul Festetics din Keszthely și lacul termal de la Hévíz.',
        sk: 'Rodinné malé letisko. Zo vzduchu vidieť Malý Balaton, Balaton, zámok Festetics v Keszthely aj jazero v Hévíze.',
      }
    },
    {
      nev: '7 Vezér Történelmi Kalandpark és Garabonciás Farm', tav: 4.5, link: '',
      leiras: {
        hu: 'Garabonc felé. Hét jurtányi honfoglalás kori kiállítás, téglavár a Magyar Királyok Arcképcsarnokával, lovaspálya, íjászpálya, sajtüzem és állatsimogató.',
        de: 'Richtung Garabonc. Sieben Jurten mit einer Ausstellung zur Landnahmezeit, eine Ziegelburg mit der Porträtgalerie der ungarischen Könige, Reitplatz, Bogenschießbahn, Käserei und Streichelzoo.',
        en: 'Towards Garabonc. Seven yurts of exhibits from the Hungarian conquest era, a brick castle holding the portrait gallery of Hungarian kings, a riding ground, an archery range, a cheese dairy and a petting zoo.',
        cs: 'Směrem na Garabonc. Sedm jurt s expozicí z doby příchodu Maďarů, cihlový hrad s galerií portrétů uherských králů, jezdecká dráha, lukostřelnice, sýrárna a kontaktní zoo.',
        ro: 'Spre Garabonc. Șapte iurte cu expoziții din epoca descălecatului maghiar, o cetate de cărămidă cu galeria de portrete a regilor Ungariei, teren de călărie, poligon de tir cu arcul, brânzărie și mini-zoo.',
        sk: 'Smerom na Garabonc. Sedem jurt s expozíciou z čias príchodu Maďarov, tehlový hrad s galériou portrétov uhorských kráľov, jazdecká dráha, lukostrelnica, syráreň a kontaktná zoo.',
      }
    },
    {
      nev: 'Pálos malom, Zalamerenye', tav: 6, link: '',
      leiras: {
        hu: 'Teljesen felújított vízimalom Zalamerenye és Zalakaros határán, egykor a pálos rend birtokán. Az 1903-as állapotában állították helyre. Magántulajdon, belépődíj nincs; ha nyitva van, be lehet nézni.',
        de: 'Vollständig renovierte Wassermühle an der Grenze von Zalamerenye und Zalakaros, einst im Besitz des Pauliner-Ordens. Wiederhergestellt im Zustand von 1903. Privatbesitz, kein Eintritt; wenn offen, darf man hineinschauen.',
        en: 'A fully restored watermill on the boundary of Zalamerenye and Zalakaros, once owned by the Pauline order. Restored to its 1903 condition. Privately owned, no entry fee; if it is open, visitors are welcome.',
        cs: 'Zcela obnovený vodní mlýn na hranici obcí Zalamerenye a Zalakaros, kdysi majetek paulánského řádu. Obnoven do stavu z roku 1903. Soukromý majetek, bez vstupného; je-li otevřeno, lze nahlédnout.',
        ro: 'Moară de apă complet restaurată la hotarul dintre Zalamerenye și Zalakaros, odinioară în proprietatea ordinului paulin. Refăcută în starea din 1903. Proprietate privată, fără taxă de intrare; dacă e deschis, se poate vizita.',
        sk: 'Úplne obnovený vodný mlyn na hranici obcí Zalamerenye a Zalakaros, kedysi majetok pavlínskeho rádu. Obnovený do stavu z roku 1903. Súkromný majetok, bez vstupného; ak je otvorené, možno nazrieť.',
      }
    },
    {
      nev: 'Panka Lovarda, Galambok', tav: 6.7, link: 'https://www.pankalovarda.hu/',
      leiras: {
        hu: 'Lovasoktatás kezdőknek, újrakezdőknek és haladóknak egyaránt.',
        de: 'Reitunterricht für Anfänger, Wiedereinsteiger und Fortgeschrittene.',
        en: 'Riding lessons for beginners, returning riders and the experienced alike.',
        cs: 'Výuka jízdy na koni pro začátečníky, návrat do sedla i pokročilé.',
        ro: 'Lecții de călărie pentru începători, pentru cei care revin în șa și pentru avansați.',
        sk: 'Výučba jazdy na koni pre začiatočníkov, návrat do sedla aj pokročilých.',
      }
    },
    {
      nev: 'Kápolnapusztai Bivalyrezervátum', tav: 12, link: '',
      leiras: {
        hu: 'Az ország legnagyobb látogatható bivalycsordája, 30 hektáron. Nyolcszáz méteres kitáblázott sétaút, interaktív kiállítás, állatsimogató; egész évben nyitva.',
        de: 'Die größte besuchbare Büffelherde des Landes auf 30 Hektar. Ein 800 Meter langer ausgeschilderter Weg, eine interaktive Ausstellung und ein Streichelgehege; ganzjährig geöffnet.',
        en: 'The country’s largest buffalo herd open to visitors, on 30 hectares. An 800-metre signed walking path, an interactive exhibition and a petting enclosure; open all year.',
        cs: 'Největší návštěvě přístupné stádo buvolů v zemi, na 30 hektarech. Osmisetmetrová značená stezka, interaktivní výstava a kontaktní výběh; otevřeno celoročně.',
        ro: 'Cea mai mare cireadă de bivoli din țară deschisă vizitatorilor, pe 30 de hectare. Potecă marcată de 800 de metri, expoziție interactivă și țarc de mângâiat animale; deschis tot anul.',
        sk: 'Najväčšie návštevníkom prístupné stádo byvolov v krajine, na 30 hektároch. Osemstometrový značený chodník, interaktívna výstava a kontaktný výbeh; otvorené celoročne.',
      }
    },
    {
      nev: 'Zobori Élménypark', tav: 12, link: 'https://www.zobori.hu/',
      leiras: {
        hu: 'Kalandpark a Balaton fölötti dombon, panorámával. Hófánkpálya hó nélkül is, beltéri részleg esős napokra, önkiszolgáló étterem.',
        de: 'Abenteuerpark auf einem Hügel über dem Balaton, mit Panorama. Snowtubing-Bahn auch ohne Schnee, Innenbereich für Regentage, Selbstbedienungsrestaurant.',
        en: 'An adventure park on a hill above Lake Balaton, with a panorama. A snow-tubing run that works without snow, an indoor section for wet days, and a self-service restaurant.',
        cs: 'Zábavní park na kopci nad Balatonem s panoramatem. Dráha pro snow tubing i bez sněhu, vnitřní část pro deštivé dny a samoobslužná restaurace.',
        ro: 'Parc de aventuri pe un deal deasupra Balatonului, cu panoramă. Pârtie de snow-tubing care merge și fără zăpadă, secțiune interioară pentru zilele ploioase și restaurant cu autoservire.',
        sk: 'Zábavný park na kopci nad Balatonom s panorámou. Dráha na snow tubing aj bez snehu, vnútorná časť na daždivé dni a samoobslužná reštaurácia.',
      }
    },
    {
      nev: 'Kányavári-sziget', tav: 14, link: '',
      leiras: {
        hu: 'A Kis-Balaton fokozottan védett szigete, fahídon közelíthető meg. Tizenöt állomásos, 1,5 km-es tanösvény, fa madármegfigyelő és kilátó. Szabadon látogatható.',
        de: 'Die streng geschützte Insel im Kleinen Balaton, über eine Holzbrücke erreichbar. Ein Lehrpfad mit 15 Stationen und 1,5 km Länge, ein hölzerner Vogelbeobachtungsstand und ein Aussichtspunkt. Frei zugänglich.',
        en: 'The strictly protected island of the Little Balaton, reached by a wooden bridge. A 15-station, 1.5 km nature trail, a timber bird hide and a lookout. Free to visit.',
        cs: 'Přísně chráněný ostrov Malého Balatonu, přístupný po dřevěném mostě. Naučná stezka s 15 zastávkami dlouhá 1,5 km, dřevěná pozorovatelna ptáků a vyhlídka. Volně přístupné.',
        ro: 'Insula strict protejată a Balatonului Mic, la care se ajunge pe un pod de lemn. Traseu tematic de 1,5 km cu 15 stații, observator de păsări din lemn și punct de belvedere. Acces liber.',
        sk: 'Prísne chránený ostrov Malého Balatonu, prístupný po drevenom moste. Náučný chodník s 15 zastávkami dlhý 1,5 km, drevená pozorovateľňa vtákov a vyhliadka. Voľne prístupné.',
      }
    },
    {
      nev: 'Állatsimogató, Fenyvespuszta', tav: 14, link: 'https://www.fenyvespuszta.hu/',
      leiras: {
        hu: 'A Kányavári-sziget bejáratánál, Balatonmagyaródon. Háziállatok közelről, pónilovaglás és családi programok. SZÉP-kártyát elfogadnak.',
        de: 'Am Eingang zur Insel Kányavári, in Balatonmagyaród. Haustiere aus der Nähe, Ponyreiten und Familienprogramme. SZÉP-Karte wird akzeptiert.',
        en: 'At the entrance to Kányavári island, in Balatonmagyaród. Farm animals up close, pony rides and family activities. The Hungarian SZÉP card is accepted.',
        cs: 'U vstupu na ostrov Kányavári, v obci Balatonmagyaród. Hospodářská zvířata zblízka, projížďky na poníkovi a rodinné programy. Přijímají kartu SZÉP.',
        ro: 'La intrarea pe insula Kányavári, în Balatonmagyaród. Animale de fermă de aproape, plimbări cu poneiul și activități pentru familii. Se acceptă cardul SZÉP.',
        sk: 'Pri vstupe na ostrov Kányavári, v obci Balatonmagyaród. Hospodárske zvieratá zblízka, jazda na poníkovi a rodinné programy. Prijímajú kartu SZÉP.',
      }
    },
    {
      nev: 'Zalavári Történelmi Emlékpark', tav: 14, link: '',
      leiras: {
        hu: 'A Kis-Balaton melletti Zalaváron, a honfoglalás előtti Mosaburg helyén. Árpád-kori templom alapjain rekonstruált Szent István-kápolna.',
        de: 'In Zalavár am Kleinen Balaton, am Ort des frühmittelalterlichen Mosaburg. Eine auf den Fundamenten einer Árpádenzeit-Kirche rekonstruierte Stephanskapelle.',
        en: 'At Zalavár by the Little Balaton, on the site of early-medieval Mosaburg. A St Stephen chapel rebuilt on the foundations of an Árpád-era church.',
        cs: 'V Zalaváru u Malého Balatonu, na místě raně středověkého Mosaburgu. Kaple svatého Štěpána rekonstruovaná na základech kostela z doby Arpádovců.',
        ro: 'La Zalavár, lângă Balatonul Mic, pe locul fostului Mosaburg medieval timpuriu. O capelă Sfântul Ștefan reconstruită pe fundațiile unei biserici din epoca arpadiană.',
        sk: 'V Zalaváre pri Malom Balatone, na mieste včasnostredovekého Mosaburgu. Kaplnka svätého Štefana rekonštruovaná na základoch kostola z čias Arpádovcov.',
      }
    },
    {
      nev: 'Nagybakónaki Sziklaszurdok', tav: 22, link: '',
      leiras: {
        hu: 'Források völgye erdőben, rendbe tett forrásokkal, padokkal és tűzrakóhellyel. Csendes félnapos kirándulás.',
        de: 'Ein Quelltal im Wald mit instand gesetzten Quellen, Bänken und einer Feuerstelle. Ein ruhiger Halbtagesausflug.',
        en: 'A valley of springs in the forest, with tidied-up springs, benches and a fire pit. A quiet half-day outing.',
        cs: 'Údolí pramenů v lese s upravenými prameny, lavičkami a ohništěm. Klidný půldenní výlet.',
        ro: 'O vale a izvoarelor în pădure, cu izvoare amenajate, bănci și vatră de foc. O ieșire liniștită de o jumătate de zi.',
        sk: 'Údolie prameňov v lese s upravenými prameňmi, lavičkami a ohniskom. Pokojný poldenný výlet.',
      }
    },
    {
      nev: 'Segway-túra', tav: 0, link: '',
      leiras: {
        hu: 'Vezetett túra Zalakaros parkjain és védett erdein át. Az első megálló általában a kilátó.',
        de: 'Geführte Tour durch die Parks und Schutzwälder von Zalakaros. Erste Station ist meist der Aussichtsturm.',
        en: 'A guided tour through the parks and protected woods of Zalakaros. The first stop is usually the lookout tower.',
        cs: 'Vedená túra parky a chráněnými lesy Zalakarosu. První zastávkou bývá rozhledna.',
        ro: 'Tur ghidat prin parcurile și pădurile protejate din Zalakaros. Prima oprire este de obicei turnul de observație.',
        sk: 'Vedená túra parkmi a chránenými lesmi Zalakarosu. Prvou zastávkou býva rozhľadňa.',
      }
    },
    {
      nev: 'Vízitúra a Zala folyón', tav: null, link: '',
      leiras: {
        hu: 'A Zala az egyetlen folyó, amely a Balatont táplálja. Vezetett evezős túrák indulnak rajta, előzetes egyeztetéssel.',
        de: 'Die Zala ist der einzige Fluss, der den Balaton speist. Geführte Paddeltouren starten nach vorheriger Absprache.',
        en: 'The Zala is the only river feeding Lake Balaton. Guided paddling trips run on it, arranged in advance.',
        cs: 'Zala je jedinou řekou, která napájí Balaton. Konají se na ní vedené vodácké túry po předchozí domluvě.',
        ro: 'Zala este singurul râu care alimentează Balatonul. Pe el se organizează ture ghidate cu caiacul, cu programare prealabilă.',
        sk: 'Zala je jedinou riekou, ktorá napája Balaton. Konajú sa na nej vedené vodácke túry po predchádzajúcej dohode.',
      }
    },
    {
      nev: 'Horgászat a Kis-Balatonon', tav: null, link: '',
      leiras: {
        hu: 'Részben telepített víz, egész évben horgászható. Engedély a környékbeli horgászboltokban váltható.',
        de: 'Teilweise besetztes Gewässer, ganzjährig beangelbar. Erlaubnisscheine gibt es in den Angelgeschäften der Umgebung.',
        en: 'A partly stocked water, fishable all year. Permits are sold in the tackle shops nearby.',
        cs: 'Částečně zarybněná voda, lovit lze celoročně. Povolenky prodávají rybářské potřeby v okolí.',
        ro: 'Apă parțial populată, se poate pescui tot anul. Permisele se obțin de la magazinele de pescuit din zonă.',
        sk: 'Čiastočne zarybnená voda, loviť možno celoročne. Povolenky predávajú rybárske potreby v okolí.',
      }
    },
  ],
};
