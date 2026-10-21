/* =============================================================================
   Tip-Top Wellness Apartman — oldal logika
   Nincs külső könyvtár, nincs build: amit itt látsz, az fut a böngészőben.
   ============================================================================= */
(function () {
  'use strict';

  /* ---------- Nyelv ------------------------------------------------------- */
  const TARTALEK = 'hu';

  function kezdoNyelv() {
    try {
      const mentett = localStorage.getItem('ttw-lang');
      if (mentett && NYELVEK.includes(mentett)) return mentett;
    } catch (e) { /* privát mód: nem baj */ }
    const kedvelt = (navigator.languages || [navigator.language || '']).map(s => String(s).slice(0, 2).toLowerCase());
    for (const k of kedvelt) if (NYELVEK.includes(k)) return k;
    return TARTALEK;
  }

  let lang = kezdoNyelv();

  function t(kulcs) {
    const sz = SZOVEGEK[lang];
    if (sz && kulcs in sz) return sz[kulcs];
    const tf = SZOVEGEK[TARTALEK];
    return (tf && kulcs in tf) ? tf[kulcs] : kulcs;
  }

  /* ---------- Apró segédek ------------------------------------------------ */
  const $  = (s, gyoker) => (gyoker || document).querySelector(s);
  const $$ = (s, gyoker) => Array.from((gyoker || document).querySelectorAll(s));

  function el(tag, attr, gyerekek) {
    const n = document.createElement(tag);
    if (attr) for (const [k, v] of Object.entries(attr)) {
      if (v === null || v === undefined) continue;
      if (k === 'text') n.textContent = v;
      else if (k === 'html') n.innerHTML = v;
      else n.setAttribute(k, v);
    }
    if (gyerekek) for (const gy of [].concat(gyerekek)) if (gy) n.appendChild(gy);
    return n;
  }

  const szamFormat = n => new Intl.NumberFormat(SZOVEGEK[lang].htmlLang).format(n);

  function ellenorzoChip() {
    return el('span', { class: 'chip-verify', text: t('ui.verify'), title: 'Az adatok a assets/js/data.js fájlban szerkeszthetők' });
  }

  /* ---------- Nyelvválasztó ---------------------------------------------- */
  function nyelvValasztoKirajzol() {
    const tarolo = $('#langPicker');
    tarolo.replaceChildren(...NYELVEK.map(kod => {
      const b = el('button', {
        type: 'button',
        text: SZOVEGEK[kod].langShort,
        title: SZOVEGEK[kod].langName,
        lang: SZOVEGEK[kod].htmlLang,
        'aria-current': kod === lang ? 'true' : 'false'
      });
      b.addEventListener('click', () => nyelvValt(kod));
      return b;
    }));
  }

  function nyelvValt(kod) {
    lang = kod;
    try { localStorage.setItem('ttw-lang', kod); } catch (e) { /* nem baj */ }
    mindentKirajzol();
  }

  /* ---------- Statikus szövegek ------------------------------------------ */
  function szovegekBehelyez() {
    document.documentElement.lang = SZOVEGEK[lang].htmlLang;
    document.title = t('meta.title');
    const be = (id, ertek) => { const n = document.getElementById(id); if (n) n.setAttribute('content', ertek); };
    be('metaDesc', t('meta.desc'));
    be('ogTitle', t('meta.title'));
    be('ogDesc', t('meta.desc'));

    $$('[data-i18n]').forEach(n => { n.textContent = t(n.dataset.i18n); });
    $$('[data-i18n-aria]').forEach(n => { n.setAttribute('aria-label', t(n.dataset.i18nAria)); });
    $$('[data-i18n-ph]').forEach(n => { n.setAttribute('placeholder', t(n.dataset.i18nPh)); });
    $$('[data-i18n-alt]').forEach(n => { n.setAttribute('alt', t(n.dataset.i18nAlt)); });
    $$('[data-link]').forEach(a => { const u = (ADATOK.linkek || {})[a.dataset.link]; if (u) a.href = u; });
  }

  /* ---------- Nyitókép ---------------------------------------------------- */
  function nyitokepBeallit() {
    const betolt = (doboz, src, cimkeKulcs) => {
      if (!doboz || !src) return;
      let img = doboz.querySelector('img');
      if (!img) {
        img = new Image();
        img.decoding = 'async';
        img.addEventListener('load', () => doboz.prepend(img));
        img.src = src;
      }
      img.alt = t(cimkeKulcs);
    };
    betolt($('#heroVisual'), ADATOK.heroKep, 'gal.room');
    betolt($('#heroInset'), ADATOK.heroKep2, 'gal.pool');
  }

  /* ---------- Wellness ---------------------------------------------------- */
  // Egyszerű vonalas ikonok a wellness-pontokhoz, a szövegek sorrendjében:
  // medence, szauna, kedvezmény, masszázs.
  const WELL_IKONOK = [
    '<path d="M3 16c1.5 0 1.5-1.2 3-1.2S7.5 16 9 16s1.5-1.2 3-1.2 1.5 1.2 3 1.2 1.5-1.2 3-1.2 1.5 1.2 3 1.2"/><path d="M3 20c1.5 0 1.5-1.2 3-1.2S7.5 20 9 20s1.5-1.2 3-1.2 1.5 1.2 3 1.2 1.5-1.2 3-1.2 1.5 1.2 3 1.2"/><path d="M8 13V6.5a2 2 0 0 1 4 0M12 13V6.5a2 2 0 0 1 4 0M8 9.5h4"/>',
    '<path d="M8 3.5c-1 1.5 1 2.5 0 4M12 3.5c-1 1.5 1 2.5 0 4M16 3.5c-1 1.5 1 2.5 0 4"/><path d="M4 11.5h16v5a3.5 3.5 0 0 1-3.5 3.5h-9A3.5 3.5 0 0 1 4 16.5z"/>',
    '<path d="M3.5 12.5 11 5h7.5v7.5L11 20z"/><circle cx="15" cy="8.5" r="1.3"/>',
    '<path d="M5 19c0-8 6-13 14-14-1 8-6 14-14 14z"/><path d="M5 19l8-8"/>',
  ];

  function wellnessKirajzol() {
    $('#wellCards').replaceChildren(...t('well.items').map((item, i) => {
      const ikon = el('span', { class: 'feat__icon', 'aria-hidden': 'true',
        html: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (WELL_IKONOK[i] || WELL_IKONOK[0]) + '</svg>' });
      return el('li', { class: 'feat' }, [ikon, el('h3', { text: item.t }), el('p', { text: item.d })]);
    }));
  }

  /* ---------- Apartman ---------------------------------------------------- */
  function apartmanKirajzol() {
    const csoportok = [
      ['apt.group.room',    'apt.list.room'],
      ['apt.group.kitchen', 'apt.list.kitchen'],
      ['apt.group.bath',    'apt.list.bath'],
      ['apt.group.terrace', 'apt.list.terrace'],
      ['apt.group.house',   'apt.list.house'],
    ];
    $('#amenities').replaceChildren(...csoportok.map(([fejKulcs, listaKulcs]) =>
      el('div', null, [
        el('h3', { text: t(fejKulcs) }),
        el('ul', null, t(listaKulcs).map(sor => el('li', { text: sor })))
      ])
    ));

    const a = ADATOK.alap;
    // Ami null, az nincs megerősítve — az a sor nem jelenik meg.
    const igenNem = v => v === null || v === undefined ? null : (v ? t('ui.yes') : t('ui.no'));
    const sorok = [
      [t('apt.spec.guests'),   String(a.maxFo)],
      a.meret ? [t('apt.spec.size'), a.meret + ' m²'] : null,
      a.legteru ? [t('apt.spec.layout'), t('ui.openPlan')] : null,
      [t('apt.spec.bath'),     String(a.furdoszoba)],
      a.emelet ? [t('apt.spec.floor'), t('apt.spec.floorN').replace('{n}', a.emelet)] : null,
      a.lift ? [t('apt.spec.lift'), t('ui.liftN').replace('{n}', a.lift)] : null,
      [t('apt.spec.access'),   igenNem(a.akadalymentes)],
      [t('apt.spec.checkin'),  a.erkezes + ' —'],
      [t('apt.spec.checkout'), '— ' + a.tavozas],
      a.minEjszaka ? [t('apt.spec.min'), a.minEjszaka + ' ' + t('apt.spec.nights')] : null,
      a.kisagy ? [t('apt.spec.cot'), t('ui.onRequest')] : null,
      [t('apt.spec.pets'),     igenNem(a.allat)],
      a.dohanyzas === 'terasz' ? [t('apt.spec.smoking'), t('ui.terraceOnly')] : null,
      ADATOK.kapcsolat.ntak ? [t('apt.spec.ntak'), ADATOK.kapcsolat.ntak] : null,
    ].filter(s => s && s[1] !== null);

    $('#specList').replaceChildren(...sorok.map(([cimke, ertek]) =>
      el('div', null, [el('dt', { text: cimke }), el('dd', { text: ertek })])
    ));
  }

  /* ---------- Galéria ----------------------------------------------------- */
  function galeriaKirajzol() {
    const lb = $('#lightbox'), lbImg = $('#lbImg');

    $('#gallery').replaceChildren(...ADATOK.galeria.map(kep => {
      const cimke = t(kep.cimkeKulcs);
      const ph = el('div', { class: 'gal__ph' }, [
        el('b', { text: cimke }),
        el('span', { text: t('gal.placeholder') })
      ]);
      // A kép rögtön a DOM-ba kerül (különben a lusta betöltés el sem indul);
      // a helykitöltő fölötte marad, amíg a kép be nem tölt.
      const img = el('img', { alt: cimke, loading: 'lazy', decoding: 'async', src: kep.fajl });
      const nyito = el('button', { class: 'gal__open', type: 'button', 'aria-label': cimke }, img);
      nyito.addEventListener('click', () => {
        lbImg.src = img.src; lbImg.alt = cimke;
        if (typeof lb.showModal === 'function') lb.showModal();
      });
      img.addEventListener('load', () => ph.remove());
      img.addEventListener('error', () => nyito.remove());   // nincs még fénykép: a helykitöltő marad

      return el('figure', null, [nyito, ph, el('figcaption', { text: cimke })]);
    }));
  }

  /* ---------- Naptár ------------------------------------------------------ */
  let foglaltNapok = new Set();
  let naptarAllapot = 'betolt';   // 'betolt' | 'kesz' | 'hiba'
  let naptarFrissitve = null;
  let naptarPelda = false;
  let lapOffset = 0;

  const napSzoveg = d =>
    d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');

  function szovegbolNap(s) {
    const [y, m, d] = String(s).split('-').map(Number);
    return new Date(y, m - 1, d);
  }

  async function naptarAdatBetolt() {
    try {
      const v = await fetch(ADATOK.naptar.adatUrl, { cache: 'no-cache' });
      if (!v.ok) throw new Error('HTTP ' + v.status);
      const adat = await v.json();
      foglaltNapok = new Set();
      naptarPelda = adat.pelda === true;
      naptarFrissitve = adat.frissitve || null;

      for (const szakasz of (adat.foglalt || [])) {
        // A "ig" a távozás napja: azt a napot NEM jelöljük foglaltnak,
        // mert délelőtt felszabadul és aznap már új vendég érkezhet.
        const kezd = szovegbolNap(szakasz.tol);
        const veg  = szovegbolNap(szakasz.ig);
        for (let d = new Date(kezd); d < veg; d.setDate(d.getDate() + 1)) {
          foglaltNapok.add(napSzoveg(d));
        }
      }
      naptarAllapot = 'kesz';
    } catch (e) {
      naptarAllapot = 'hiba';
    }
    naptarKirajzol();
  }

  function honapKirajzol(ev, honap, ma) {
    const elso = new Date(ev, honap, 1);
    const napokSzama = new Date(ev, honap + 1, 0).getDate();
    const kezdoOszlop = (elso.getDay() + 6) % 7;          // hétfővel kezdünk

    const fejSor = el('tr', null, t('cal.weekdays').map(n => el('th', { scope: 'col', text: n })));
    const sorok = [];
    let sor = [];

    for (let i = 0; i < kezdoOszlop; i++) sor.push(el('td', null, el('div', { class: 'day day--out' })));

    for (let n = 1; n <= napokSzama; n++) {
      const d = new Date(ev, honap, n);
      const kulcs = napSzoveg(d);
      const osztalyok = ['day'];
      let cimke;

      if (d < ma) { osztalyok.push('day--past'); cimke = t('cal.past'); }
      else if (foglaltNapok.has(kulcs)) { osztalyok.push('day--busy'); cimke = t('cal.booked'); }
      else { cimke = t('cal.free'); }
      if (kulcs === napSzoveg(ma)) osztalyok.push('day--today');

      sor.push(el('td', null, el('div', {
        class: osztalyok.join(' '),
        text: String(n),
        title: kulcs + ' — ' + cimke,
        'aria-label': kulcs + ' — ' + cimke
      })));

      if (sor.length === 7) { sorok.push(el('tr', null, sor)); sor = []; }
    }
    while (sor.length && sor.length < 7) sor.push(el('td', null, el('div', { class: 'day day--out' })));
    if (sor.length) sorok.push(el('tr', null, sor));

    return el('div', { class: 'month' }, [
      el('h3', { text: t('cal.months')[honap] + ' ' + ev }),
      el('table', null, [
        el('thead', null, fejSor),
        el('tbody', null, sorok)
      ])
    ]);
  }

  function naptarKirajzol() {
    const tarolo = $('#calMonths');
    const meta = $('#calMeta');

    // Amíg nincs valódi foglalási adat, a naptár helyett kapcsolatfelvételre biztatunk.
    const aktiv = ADATOK.naptar.aktiv !== false;
    $('.cal__bar').hidden = !aktiv;
    if (!aktiv) {
      tarolo.replaceChildren(el('div', { class: 'note' }, [
        el('p', { text: t('cal.soon') }),
        el('p', { class: 'cal__soonCta' }, [
          el('a', { class: 'btn btn--primary', href: '#kapcsolat', text: t('hero.cta.contact') })
        ])
      ]));
      meta.replaceChildren();
      return;
    }

    if (naptarAllapot === 'betolt') {
      tarolo.replaceChildren(el('p', { class: 'lede', text: t('cal.loading') }));
      meta.replaceChildren();
      return;
    }
    if (naptarAllapot === 'hiba') {
      tarolo.replaceChildren(el('p', { class: 'note', text: t('cal.fallback') }));
      meta.replaceChildren();
      $('#calPrev').disabled = true;
      $('#calNext').disabled = true;
      return;
    }

    const most = new Date();
    const ma = new Date(most.getFullYear(), most.getMonth(), most.getDate());
    const kezdo = new Date(most.getFullYear(), most.getMonth() + lapOffset, 1);

    tarolo.replaceChildren(
      honapKirajzol(kezdo.getFullYear(), kezdo.getMonth(), ma),
      honapKirajzol(new Date(kezdo.getFullYear(), kezdo.getMonth() + 1, 1).getFullYear(),
                    new Date(kezdo.getFullYear(), kezdo.getMonth() + 1, 1).getMonth(), ma)
    );

    $('#calPrev').disabled = lapOffset <= 0;
    $('#calNext').disabled = lapOffset >= ADATOK.naptar.honapokElore - 2;

    const metaSorok = ADATOK.alap.minEjszaka
      ? [el('span', { text: t('cal.min').replace('{n}', ADATOK.alap.minEjszaka) })]
      : [];
    if (naptarFrissitve) {
      const d = new Date(naptarFrissitve);
      if (!isNaN(d)) metaSorok.push(el('span', {
        text: t('cal.updated') + ' ' + d.toLocaleDateString(SZOVEGEK[lang].htmlLang)
      }));
    }
    if (naptarPelda) metaSorok.push(el('span', { class: 'chip-verify', text: t('ui.verify') }));
    meta.replaceChildren(...metaSorok);
  }

  /* ---------- Árak -------------------------------------------------------- */
  function arakKirajzol() {
    const ar = ADATOK.arak;
    // Meg nem erősített árat nem mutatunk a vendégeknek.
    const tabla = $('.ptable');
    tabla.hidden = !!ar.kitoltendo;
    let kerje = $('#priceAsk');
    if (!kerje) {
      kerje = el('p', { id: 'priceAsk', class: 'lede' });
      tabla.after(kerje);
    }
    kerje.hidden = !ar.kitoltendo;
    kerje.textContent = t('price.ask');
    $('#priceRows').replaceChildren(...ar.idoszakok.map(i =>
      el('tr', null, [
        el('td', null, [
          el('b', { text: t('price.period.' + i.kulcs) }),
          el('small', { text: t('price.period.' + i.kulcs + '.sub') })
        ]),
        el('td', null, el('span', { class: 'amount', text: szamFormat(i.ar) + ' ' + ar.penznem }))
      ])
    ));

    $('#ifaNote').textContent = t('price.ifa').replace('{n}', szamFormat(ar.ifa));
    $('#inclList').replaceChildren(...t('price.incl').map(s => el('li', { text: s })));

    $('#portals').replaceChildren(...ADATOK.portalok.map(p =>
      el('a', { href: p.url, text: p.nev, target: '_blank', rel: 'noopener noreferrer' })
    ));
  }

  /* ---------- Programok --------------------------------------------------- */
  function tavolsag(km) {
    if (km === null || km === undefined) return t('prog.ask');
    if (km < 1) return t('prog.walk');
    return t('prog.km').replace('{n}', szamFormat(km));
  }

  function programokKirajzol() {
    // Közelebbi előre; az egyeztetés szerintiek a lista végére.
    const lista = [...ADATOK.programok].sort((a, b) =>
      (a.tav ?? 999) - (b.tav ?? 999));
    $('#progList').replaceChildren(...lista.map(p => {
      const fej = el('div', { class: 'prog__head' }, [
        el('h3', { text: p.nev }),
        el('span', { class: 'prog__dist', text: tavolsag(p.tav) })
      ]);
      const tartalom = [fej, el('p', { text: p.leiras[lang] || p.leiras[TARTALEK] })];
      if (p.link) tartalom.push(el('a', {
        class: 'prog__link', href: p.link, target: '_blank', rel: 'noopener noreferrer',
        text: t('prog.site') + ' ↗'
      }));
      return el('li', { class: 'prog' }, tartalom);
    }));
  }

  /* ---------- Kapcsolat --------------------------------------------------- */
  function masoloGomb(ertek) {
    const b = el('button', { class: 'copy', type: 'button', text: t('contact.copy') });
    b.addEventListener('click', async () => {
      const eredeti = t('contact.copy');
      try {
        await navigator.clipboard.writeText(ertek);
        b.textContent = t('contact.copied');
      } catch (e) {
        // Ahol a vágólap tiltott: kijelöljük, hogy kézzel másolható legyen.
        const s = document.createElement('span');
        s.textContent = ertek;
        b.replaceWith(s);
        const r = document.createRange();
        r.selectNodeContents(s);
        const kijeloles = window.getSelection();
        kijeloles.removeAllRanges();
        kijeloles.addRange(r);
        return;
      }
      setTimeout(() => { b.textContent = eredeti; }, 1800);
    });
    return b;
  }

  function kapcsolatKirajzol() {
    const k = ADATOK.kapcsolat, c = ADATOK.cim;
    const sorok = [];

    const sor = (cimke, tartalom) => el('div', { class: 'cline' }, [el('dt', { text: cimke }), tartalom]);

    sorok.push(sor(t('contact.phone'), el('dd', null, [
      el('a', { class: 'big', href: 'tel:' + k.telefonHivas, text: k.telefon }),
      masoloGomb(k.telefon)
    ])));

    sorok.push(sor(t('contact.email'), el('dd', null, [
      el('a', { class: 'big', href: 'mailto:' + k.email, text: k.email }),
      masoloGomb(k.email)
    ])));

    const cimSzoveg = [c.psz, c.varos, c.utca].filter(Boolean).join(' ') + (c.epulet ? ' · ' + c.epulet : '');
    sorok.push(sor(t('contact.address'), el('dd', null, [
      el('span', { text: cimSzoveg }),
      el('a', { class: 'copy', href: c.terkepLink, text: t('contact.route'), target: '_blank', rel: 'noopener noreferrer' })
    ])));

    if (k.nyelvek && k.nyelvek.length) {
      sorok.push(sor(t('contact.langs'), el('dd', null,
        el('span', { text: k.nyelvek.map(n => SZOVEGEK[n] ? SZOVEGEK[n].langName : n).join(', ') })
      )));
    }
    if (k.uzemelteto) {
      sorok.push(sor(t('contact.host'), el('dd', null, el('span', {
        text: k.uzemelteto + (k.beosztas && lang === 'hu' ? ', ' + k.beosztas : '')
      }))));
    }
    if (k.ntak) {
      sorok.push(sor(t('contact.ntak'), el('dd', null, el('span', { text: k.ntak }))));
    }

    $('#contactList').replaceChildren(...sorok);
  }

  /* ---------- Űrlap ------------------------------------------------------- */
  function urlapBeallit() {
    const valaszto = $('#fGuests');
    const elozo = valaszto.value;
    valaszto.replaceChildren(...Array.from({ length: ADATOK.alap.maxFo }, (_, i) =>
      el('option', { value: String(i + 1), text: String(i + 1) })
    ));
    valaszto.value = elozo || String(Math.min(2, ADATOK.alap.maxFo));
  }

  function urlapKezel() {
    const form = $('#enquiry');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const uzenet = $('#formMsg');
      const nev = $('#fName').value.trim();
      const email = $('#fEmail').value.trim();

      if (!nev || !email) {
        uzenet.textContent = t('form.required');
        uzenet.hidden = false;
        (!nev ? $('#fName') : $('#fEmail')).focus();
        return;
      }
      uzenet.hidden = true;

      const sorok = [
        t('form.name') + ': ' + nev,
        t('form.email') + ': ' + email,
        t('form.arrival') + ': ' + ($('#fIn').value || '—'),
        t('form.departure') + ': ' + ($('#fOut').value || '—'),
        t('form.guests') + ': ' + $('#fGuests').value,
        '',
        $('#fMsg').value.trim()
      ];
      const href = 'mailto:' + encodeURIComponent(ADATOK.kapcsolat.email)
        + '?subject=' + encodeURIComponent(t('form.subject'))
        + '&body=' + encodeURIComponent(sorok.join('\n'));
      window.location.href = href;
    });
  }

  /* ---------- Ellenőrizendő adatok jelzése -------------------------------- */
  function chipekKirajzol() {
    $$('.chip-verify.auto').forEach(n => n.remove());
    const tedd = (valaszto, kell) => {
      if (!kell) return;
      const cel = $(valaszto);
      if (!cel) return;
      const chip = ellenorzoChip();
      chip.classList.add('auto');
      chip.style.marginLeft = '.6rem';
      cel.appendChild(chip);
    };
    tedd('#apartman h2', ADATOK.alap.kitoltendo || ADATOK.cim.kitoltendo);
    tedd('#kapcsolat h2', ADATOK.kapcsolat.kitoltendo);
  }

  /* ---------- Összefogó --------------------------------------------------- */
  function mindentKirajzol() {
    szovegekBehelyez();
    nyelvValasztoKirajzol();
    wellnessKirajzol();
    apartmanKirajzol();
    galeriaKirajzol();
    arakKirajzol();
    programokKirajzol();
    nyitokepBeallit();
    kapcsolatKirajzol();
    urlapBeallit();
    naptarKirajzol();
    chipekKirajzol();

    const jog = $('#footLegal');
    if (jog) jog.textContent = '© ' + new Date().getFullYear() + ' Tip-Top Wellness Apartman · ' + t('footer.rights');
  }

  /* ---------- Indulás ----------------------------------------------------- */
  mindentKirajzol();
  urlapKezel();
  if (ADATOK.naptar.aktiv !== false) naptarAdatBetolt();

  $('#calPrev').addEventListener('click', () => { lapOffset = Math.max(0, lapOffset - 1); naptarKirajzol(); });
  $('#calNext').addEventListener('click', () => {
    lapOffset = Math.min(ADATOK.naptar.honapokElore - 2, lapOffset + 1);
    naptarKirajzol();
  });

  const lb = $('#lightbox');
  $('#lbClose').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
})();
