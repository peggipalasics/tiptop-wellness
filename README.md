# Tip-Top Wellness Apartman — weboldal

Statikus weboldal, hat nyelven (magyar, német, angol, cseh, román, szlovák),
szabad-napok naptárral. Nincs szerver, nincs adatbázis, nincs havidíj:
GitHub Pages ingyen kiszolgálja, saját domainnel és HTTPS-sel.

```
index.html                 a teljes oldal szerkezete
assets/css/style.css       megjelenés
assets/js/data.js          >>> ADATOK: telefon, cím, árak, képek <<<
assets/js/i18n.js          a hat nyelv szövegei
assets/js/app.js           naptár, galéria, űrlap, nyelvváltás
data/availability.json     a foglalt időszakok
images/                    ide kerülnek a fényképek
tools/sync-ical.mjs        iCal -> availability.json
.github/workflows/         napi naptár-szinkron
```

---

## 1. Adatok

Minden szerkeszthető adat egyetlen fájlban van: **`assets/js/data.js`**.

Az adatok a házi Programajánlóból és a hivatalos szálláshirdetés szövegéből
jönnek. Ahol egy blokkban `kitoltendo: true` szerepel, ott a weboldalon sárga
**„Ellenőrizendő adat”** jelzés látszik. Most már csak egy ilyen maradt:

| Hol | Mit |
|---|---|
| `arak` | a tényleges árlista — a benne lévő számok még a portálokról vett példák |

Ezek nincsenek megerősítve, ezért `null` értékkel szerepelnek, és a weboldalon
**nem jelennek meg**, amíg ki nem töltöd őket:

- `alap.minEjszaka` — van-e legrövidebb tartózkodás (pl. `2`)
- `alap.allat` — hozható-e kisállat (`true` / `false`)

A wifi jelszava szándékosan nincs a weboldalon: az a nyomtatott füzetbe való.

## 2. Fényképek

1. Tedd a képeket az `images/` mappába.
2. A fájlnevek az `assets/js/data.js` `galeria` listájában szerepelnek
   (`medence.jpg`, `szauna.jpg`, `haloszoba.jpg`, …). Vagy nevezd át a képeket
   ezekre, vagy írd át a listát a saját fájlneveidre.

Amíg egy kép hiányzik, a helyén igényes helykitöltő látszik a helyiség nevével —
az oldal nem törik el tőle.

**Méret:** a telefonról jövő 4–8 MB-os képek lassúvá teszik az oldalt. Hosszabb
oldalukat vágd 1800 képpontra, JPEG-ben, 80% körüli minőséggel. Ingyenes, feltöltés
nélküli eszköz erre a [squoosh.app](https://squoosh.app). Cél: kép/500 KB alatt.

A nyitóképnek a `images/medence.jpg` szolgál (ez jelenik meg akkor is, ha valaki
megosztja az oldal linkjét Facebookon vagy Messengeren). Ha nincs ilyen fájl, a
nyitóképen a CSS-ből rajzolt vízfelület látszik.

---

## 3. Közzététel GitHub Pages-en

1. Készíts egy GitHub-fiókot (ingyenes), ha még nincs.
2. **New repository** → a neve legyen pl. `tiptop-wellness`, legyen **Public**.
3. Töltsd fel ennek a mappának a teljes tartalmát (a repó főoldalán
   *Add file → Upload files*, és húzd be az egészet; a rejtett `.github` mappát
   is, azt a böngészőből a *Upload files* felület viszi).
4. **Settings → Pages** → *Source*: `Deploy from a branch`, *Branch*: `main`,
   mappa: `/ (root)` → **Save**.
5. Egy-két perc múlva él a `https://<fióknév>.github.io/tiptop-wellness/` címen.

### A saját domain bekötése

1. **Settings → Pages → Custom domain**: írd be a domaint (pl. `tiptopwellness.hu`),
   **Save**. Ezzel a GitHub létrehoz egy `CNAME` fájlt a repóban.
2. A domain szolgáltatójánál (ahol megvetted) a DNS-beállításokban:

   | Típus | Név | Érték |
   |---|---|---|
   | A | `@` | `185.199.108.153` |
   | A | `@` | `185.199.109.153` |
   | A | `@` | `185.199.110.153` |
   | A | `@` | `185.199.111.153` |
   | CNAME | `www` | `<fióknév>.github.io` |

3. A DNS átállása pár perctől pár óráig tart. Amikor kész, a Pages oldalon
   pipáld be az **Enforce HTTPS** jelölőt.

> A fenti négy IP a GitHub Pages hivatalos címe. Ha évek múlva nem működne,
> a GitHub Pages dokumentációjában szerepel az aktuális lista.

---

## 4. A naptár

A naptár a `data/availability.json` fájlból olvas. Két mód van rá:

### A — Kézzel

Nyisd meg a fájlt a GitHubon (ceruza ikon), és írd bele a foglalásokat:

```json
{
  "pelda": false,
  "frissitve": "2026-11-02T09:00:00Z",
  "foglalt": [
    { "tol": "2026-12-27", "ig": "2027-01-02" }
  ]
}
```

A `tol` az érkezés, az `ig` a **távozás** napja. A távozás napját a naptár
szabadként mutatja, mert aznap délelőtt felszabadul.

A `"pelda": true` beállítás mellett a naptár alatt megjelenik az
„Ellenőrizendő adat” jelzés — a fájl most ebben az állapotban van, példaadatokkal.
Az első valódi feltöltéskor állítsd `false`-ra.

### B — Automatikusan, a Booking és az Airbnb naptárából

Így nem kell kézzel vezetni, és nincs duplafoglalás.

1. Kérd le az iCal-exportok linkjét:
   - **Airbnb**: Naptár → az adott szállás → *Availability* / *Elérhetőség* →
     *Connect another website* → *Export calendar*. Egy `.ics` végű link.
   - **Booking.com** extranet: *Rates & Availability → Calendar sync / iCal* →
     *Export*.
2. A GitHub repóban: **Settings → Secrets and variables → Actions →
   New repository secret**.
   - Név: `ICAL_URLS`
   - Érték: a linkek, egy sorban egy:
     ```
     https://www.airbnb.com/calendar/ical/....ics
     https://ical.booking.com/v1/export?t=....
     ```
3. **Settings → Actions → General** → *Workflow permissions* →
   `Read and write permissions` → **Save**.
4. Az **Actions** fülön a „Naptár szinkron” → *Run workflow* gombbal
   azonnal lefuttathatod. Innentől naponta kétszer magától frissül.

Ha egyik forrás sem válaszol, a szinkron nem írja felül a meglévő fájlt —
inkább egy kicsit elavult naptár látszik, mint egy üres.

Helyben is futtathatod:

```bash
ICAL_URLS="https://...ics" node tools/sync-ical.mjs
```

---

## 5. Szöveg átírása

Minden szöveg az `assets/js/i18n.js` fájlban van, nyelv szerint csoportosítva.
Egy szöveg átírása: keresd meg a kulcsot (pl. `hero.title`), és írd át mind a
hat nyelvnél. Ha egy kulcs kimarad valamelyik nyelvből, ott a magyar változat
jelenik meg — tehát nem lesz üres hely.

Új nyelv hozzáadása: tedd be a kódját a `NYELVEK` listába, és másold be a
magyar blokk egy példányát `SZOVEGEK`-be, lefordítva.

## 6. Helyi megnyitás próbára

A naptár `fetch`-el olvassa a JSON-t, amit a böngésző fájlként megnyitva
letilt. Ezért próbához indíts egy helyi kiszolgálót a mappában:

```bash
python3 -m http.server 8000
```

Majd nyisd meg: `http://localhost:8000`

---

## Mit nem tartalmaz

- **Online fizetést.** Az űrlap az adatokat a látogató saját e-mail
  programjában nyitja meg — nincs mögötte szerver, ezért nem is kerül semmibe,
  és nem kell adatvédelmi nyilvántartást vezetni hozzá. Ha igazi beküldött
  űrlapot szeretnél, arra ingyenes megoldás például a Formspree vagy a
  Cloudflare Pages beépített űrlapkezelése.
- **Sütiket és követőkódot.** Nincs Google Analytics, nincs cookie-sáv,
  mert nincs mit bejelenteni. Egyedül a nyelvválasztást jegyzi meg a böngésző
  saját tárolójában.
