/* =============================================================================
   Naptár-szinkron: a Booking / Airbnb / Szállás.hu iCal-exportjából előállítja
   a data/availability.json fájlt.

   Futtatás:
     ICAL_URLS="https://...ics
     https://...ics" node tools/sync-ical.mjs

   A GitHub Action (.github/workflows/naptar-szinkron.yml) naponta lefuttatja,
   és ha változott a tartalom, visszacommitolja a fájlt.

   Nincs külső csomag: Node 20+ beépített fetch-et használ.
   ============================================================================= */

import { readFile, writeFile } from 'node:fs/promises';

const KIMENET = 'data/availability.json';

/* --- iCal-sorok összehajtása: a folytatósorok szóközzel/tabbal kezdődnek --- */
function sorokat(ics) {
  const nyers = ics.replace(/\r\n/g, '\n').split('\n');
  const out = [];
  for (const sor of nyers) {
    if (/^[ \t]/.test(sor) && out.length) out[out.length - 1] += sor.slice(1);
    else out.push(sor);
  }
  return out;
}

/* --- DTSTART / DTEND érték -> YYYY-MM-DD ---------------------------------- */
function datum(ertek) {
  const m = String(ertek).trim().match(/^(\d{4})(\d{2})(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]}` : null;
}

function eventeket(ics) {
  const szakaszok = [];
  let akt = null;
  for (const sor of sorokat(ics)) {
    if (sor.startsWith('BEGIN:VEVENT')) { akt = {}; continue; }
    if (sor.startsWith('END:VEVENT')) {
      if (akt && akt.tol && akt.ig && akt.ig > akt.tol) szakaszok.push({ tol: akt.tol, ig: akt.ig });
      akt = null;
      continue;
    }
    if (!akt) continue;
    const ketto = sor.indexOf(':');
    if (ketto < 0) continue;
    const nev = sor.slice(0, ketto).split(';')[0].toUpperCase();
    const ertek = sor.slice(ketto + 1);
    if (nev === 'DTSTART') akt.tol = datum(ertek);
    if (nev === 'DTEND')   akt.ig  = datum(ertek);
  }
  return szakaszok;
}

/* --- Átfedő/szomszédos időszakok összevonása ------------------------------ */
function osszevon(szakaszok) {
  const rendezett = [...szakaszok].sort((a, b) => a.tol.localeCompare(b.tol));
  const out = [];
  for (const sz of rendezett) {
    const utolso = out[out.length - 1];
    if (utolso && sz.tol <= utolso.ig) {
      if (sz.ig > utolso.ig) utolso.ig = sz.ig;
    } else {
      out.push({ ...sz });
    }
  }
  return out;
}

/* --- Futás --------------------------------------------------------------- */
const urlok = (process.env.ICAL_URLS || '')
  .split(/[\s,]+/)
  .map(s => s.trim())
  .filter(s => /^https?:\/\//.test(s));

if (!urlok.length) {
  console.error('Nincs megadva ICAL_URLS. A data/availability.json változatlan marad.');
  process.exit(0);
}

const mind = [];
const forrasok = [];

for (const url of urlok) {
  const nev = new URL(url).hostname;
  try {
    const v = await fetch(url, { headers: { 'user-agent': 'tiptop-wellness-calendar-sync' } });
    if (!v.ok) throw new Error('HTTP ' + v.status);
    const szakaszok = eventeket(await v.text());
    mind.push(...szakaszok);
    forrasok.push({ forras: nev, idoszakok: szakaszok.length, allapot: 'ok' });
    console.log(`${nev}: ${szakaszok.length} foglalt időszak`);
  } catch (e) {
    forrasok.push({ forras: nev, allapot: 'hiba', hiba: String(e.message || e) });
    console.error(`${nev}: ${e.message || e}`);
  }
}

/* Ha minden forrás elhasalt, inkább ne írjuk felül a meglévő, jó adatot. */
if (!forrasok.some(f => f.allapot === 'ok')) {
  console.error('Egyetlen iCal-forrás sem válaszolt. A meglévő fájlt meghagyjuk.');
  process.exit(1);
}

const uj = {
  _megjegyzes: 'Ezt a fájlt a tools/sync-ical.mjs állítja elő az iCal-exportokból. Kézi szerkesztés esetén a következő szinkron felülírja.',
  pelda: false,
  frissitve: new Date().toISOString(),
  forrasok,
  foglalt: osszevon(mind),
};

/* Csak akkor írunk, ha a foglalások tényleg változtak — így nem keletkezik
   napi commit puszta időbélyeg-csere miatt. */
let regiFoglalt = null;
try {
  regiFoglalt = JSON.stringify(JSON.parse(await readFile(KIMENET, 'utf8')).foglalt);
} catch (e) { /* még nincs fájl */ }

if (regiFoglalt === JSON.stringify(uj.foglalt)) {
  console.log('A foglalások nem változtak — nincs írás.');
  process.exit(0);
}

await writeFile(KIMENET, JSON.stringify(uj, null, 2) + '\n', 'utf8');
console.log(`Kész: ${uj.foglalt.length} foglalt időszak a ${KIMENET} fájlban.`);
