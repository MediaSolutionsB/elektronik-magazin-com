// Rechenlogik der Fernseher-, Beamer-, Ton- und HDMI-Rechner. Reine Funktionen, ohne Browser-Bezug.

const RAD = Math.PI / 180;
const rund = (n, s = 1) => Math.round(n / s) * s;

/** Seitenverhältnisse als Zahl (Breite ÷ Höhe). „21:9“ heißt im Handel eigentlich 64:27 = 2,37. */
export const FORMATE = {
  '16:9': 16 / 9,
  '21:9': 64 / 27,
  '4:3': 4 / 3,
  '1.85:1': 1.85,
  '2.39:1': 2.39,
};

/** Breite, Höhe und Fläche eines Bildschirms aus Diagonale (Zoll) und Format. Ergebnis in cm bzw. m². */
export function bildMasse({ zoll = 0, format = '16:9' }) {
  const r = FORMATE[format] || 16 / 9;
  const diagCm = zoll * 2.54;
  const hoehe = diagCm / Math.sqrt(1 + r * r);
  const breite = hoehe * r;
  return { diagCm, breite, hoehe, flaecheM2: (breite * hoehe) / 10000, r };
}

/** Diagonale (Zoll) aus Bildbreite (cm) und Format. */
export function zollAusBreite({ breiteCm = 0, format = '16:9' }) {
  const r = FORMATE[format] || 16 / 9;
  return (breiteCm * Math.sqrt(1 + 1 / (r * r))) / 2.54;
}

/* ---------------------------------------------------------------- TV-Montagehöhe */

/**
 * Die Bildmitte gehört auf Augenhöhe. Bis 10° nach oben schauen ist noch bequem, 15° ist die Obergrenze
 * (z. B. TV über dem Kamin). Alle Angaben in cm, gemessen vom Fußboden.
 */
export function montagehoehe({ augenCm = 0, zoll = 0, abstandM = 0 }) {
  const b = bildMasse({ zoll });
  const abstandCm = abstandM * 100;
  const mitte = augenCm;
  const max10 = augenCm + Math.tan(10 * RAD) * abstandCm;
  const max15 = augenCm + Math.tan(15 * RAD) * abstandCm;
  return {
    hoeheBild: b.hoehe,
    breiteBild: b.breite,
    mitte,
    unterkante: mitte - b.hoehe / 2,
    oberkante: mitte + b.hoehe / 2,
    max10,
    max15,
    unterkanteMax15: max15 - b.hoehe / 2,
  };
}

/* ---------------------------------------------------------------- Seitenverhältnis / schwarze Balken */

export function balken({ zoll = 0, tvFormat = '16:9', filmFormat = '2.39:1' }) {
  const tv = bildMasse({ zoll, format: tvFormat });
  const f = FORMATE[filmFormat] || 2.39;
  let bildB, bildH, art;
  if (f > tv.r + 1e-6) { bildB = tv.breite; bildH = tv.breite / f; art = 'oben-unten'; }
  else if (f < tv.r - 1e-6) { bildH = tv.hoehe; bildB = tv.hoehe * f; art = 'links-rechts'; }
  else { bildB = tv.breite; bildH = tv.hoehe; art = 'keine'; }
  const balkenJe = art === 'oben-unten' ? (tv.hoehe - bildH) / 2 : art === 'links-rechts' ? (tv.breite - bildB) / 2 : 0;
  const genutzt = (bildB * bildH) / (tv.breite * tv.hoehe);
  const bildDiagZoll = Math.sqrt(bildB * bildB + bildH * bildH) / 2.54;
  return { tv, bildB, bildH, art, balkenJe, genutzt, bildDiagZoll };
}

/* ---------------------------------------------------------------- Blickwinkel */

/** Horizontaler Blickwinkel in Grad. SMPTE empfiehlt mindestens 30°, THX 36° (bis 40°). */
export function blickwinkel({ zoll = 0, abstandM = 0, format = '16:9' }) {
  const b = bildMasse({ zoll, format });
  const d = abstandM * 100;
  const grad = d > 0 ? (2 * Math.atan(b.breite / 2 / d)) / RAD : 0;
  const abstandFuer = (g) => b.breite / 2 / Math.tan((g / 2) * RAD) / 100;
  return { grad, breite: b.breite, abstand30: abstandFuer(30), abstand36: abstandFuer(36), abstand40: abstandFuer(40) };
}

/* ---------------------------------------------------------------- TV-Stromverbrauch */

/** Typische Leistung im SDR-Betrieb in Watt pro m² Bildfläche (Mittelwerte aus EU-Energielabels). */
export const PANEL_W_M2 = { led: 100, qled: 115, oled: 120 };

export function tvStrom({ zoll = 0, panel = 'led', stunden = 0, preisCent = 0, eigenWatt = 0, standbyWatt = 0.5 }) {
  const b = bildMasse({ zoll });
  const watt = eigenWatt > 0 ? eigenWatt : b.flaecheM2 * (PANEL_W_M2[panel] || 100);
  const h = Math.min(24, Math.max(0, stunden));
  const kwhJahr = ((watt * h + standbyWatt * (24 - h)) * 365) / 1000;
  const kosten = (kwhJahr * preisCent) / 100;
  return { watt, geschaetzt: !(eigenWatt > 0), kwhJahr, kostenJahr: kosten, kostenMonat: kosten / 12, flaecheM2: b.flaecheM2 };
}

/* ---------------------------------------------------------------- Leinwand */

export const LEINWAND_GROESSEN = [80, 84, 90, 92, 100, 106, 110, 120, 125, 135, 150, 165, 180];
/** Wunsch-Blickwinkel: Full-HD etwas kleiner (sonst sieht man Pixel), 4K darf größer. */
export const LEINWAND_WINKEL = { fhd: { ideal: 33, min: 30, max: 36 }, '4k': { ideal: 40, min: 36, max: 45 } };

export function leinwand({ abstandM = 0, wandM = 0, format = '16:9', aufloesung = '4k' }) {
  const w = LEINWAND_WINKEL[aufloesung] || LEINWAND_WINKEL['4k'];
  const breiteFuer = (g) => 2 * abstandM * 100 * Math.tan((g / 2) * RAD);
  const ideal = breiteFuer(w.ideal);
  const maxWand = wandM > 0 ? Math.max(0, wandM * 100 - 30) : Infinity;
  const breite = Math.min(ideal, maxWand);
  const r = FORMATE[format] || 16 / 9;
  const zoll = zollAusBreite({ breiteCm: breite, format });
  const passend = LEINWAND_GROESSEN.filter((z) => z <= zoll + 0.5);
  const standard = passend.length ? passend[passend.length - 1] : null;
  return {
    breite,
    hoehe: breite / r,
    zoll,
    standard,
    begrenztDurchWand: maxWand < ideal,
    zollMin: zollAusBreite({ breiteCm: Math.min(breiteFuer(w.min), maxWand), format }),
    zollMax: zollAusBreite({ breiteCm: Math.min(breiteFuer(w.max), maxWand), format }),
    winkel: w,
  };
}

/* ---------------------------------------------------------------- Beamer-Helligkeit */

/** Zielhelligkeit auf der Leinwand in Foot-Lambert: Kino-Norm 16 fL, mit Restlicht deutlich mehr. */
export const LICHT_FL = { dunkel: 16, gedimmt: 30, hell: 50 };

export function beamerLumen({ zoll = 0, format = '16:9', licht = 'dunkel', gain = 1 }) {
  const b = bildMasse({ zoll, format });
  const ft2 = b.flaecheM2 * 10.7639;
  const g = gain > 0 ? gain : 1;
  const minimum = ((LICHT_FL[licht] || 16) * ft2) / g;
  return { flaecheM2: b.flaecheM2, minimum, empfohlen: rund(minimum * 2, 100) };
}

/* ---------------------------------------------------------------- Lautsprecher-Aufstellung */

/** Winkel nach den Empfehlungen von Dolby (0° = genau vorne, positive Werte = rechts). */
const BOXEN = {
  front: [{ name: 'Front links / rechts', winkel: 30, bereich: '22–30°' }, { name: 'Center', winkel: 0, bereich: '0°, direkt unter oder über dem Bild' }],
  surround5: [{ name: 'Surround links / rechts', winkel: 110, bereich: '110–120°' }],
  side7: [{ name: 'Seiten-Surround links / rechts', winkel: 100, bereich: '90–110°' }],
  rear7: [{ name: 'Rück-Surround links / rechts', winkel: 140, bereich: '135–150°' }],
};
export const SYSTEME = ['5.1', '7.1', '5.1.2', '5.1.4', '7.1.2', '7.1.4'];

export function lautsprecher({ system = '5.1', abstandM = 0, raumBreiteM = 0, raumHoeheM = 0, ohrM = 1.1 }) {
  const [basis, , decke = '0'] = system.split('.');
  const sieben = basis === '7';
  const liste = [...BOXEN.front, ...(sieben ? [...BOXEN.side7, ...BOXEN.rear7] : BOXEN.surround5)];
  const r = abstandM;
  const halbeBreite = raumBreiteM > 0 ? raumBreiteM / 2 : Infinity;
  const boxen = liste.map((b) => {
    const seitlich = r * Math.sin(b.winkel * RAD);
    const vorne = r * Math.cos(b.winkel * RAD);
    return { ...b, seitlich, vorne, anWand: seitlich > halbeBreite - 0.15, hoehe: b.winkel === 0 ? null : 'ohr' };
  });
  const v = raumHoeheM > 0 ? raumHoeheM - ohrM : 0;
  const seitlichDecke = r * Math.sin(30 * RAD);
  const deckenBoxen = [];
  if (decke === '2') deckenBoxen.push({ name: 'Decke Mitte links / rechts', elevation: 80, bereich: '65–100°', vorne: v > 0 ? v / Math.tan(80 * RAD) : 0, seitlich: seitlichDecke });
  if (decke === '4') {
    deckenBoxen.push({ name: 'Decke vorne links / rechts', elevation: 45, bereich: '30–55°', vorne: v > 0 ? v / Math.tan(45 * RAD) : 0, seitlich: seitlichDecke });
    deckenBoxen.push({ name: 'Decke hinten links / rechts', elevation: 45, bereich: '30–55° (hinter dir)', vorne: v > 0 ? -v / Math.tan(45 * RAD) : 0, seitlich: seitlichDecke });
  }
  return { boxen, deckenBoxen, deckeUeberOhr: v, sub: Number(system.split('.')[1] || 1) };
}

/* ---------------------------------------------------------------- Raummoden */

export const SCHALL = 343; // m/s bei 20 °C

export function raummoden({ l = 0, b = 0, h = 0, bis = 200 }) {
  const dims = [l, b, h];
  if (dims.some((d) => !(d > 0))) return null;
  const modes = [];
  for (let x = 0; x <= 12; x++) for (let y = 0; y <= 12; y++) for (let z = 0; z <= 12; z++) {
    if (!x && !y && !z) continue;
    const f = (SCHALL / 2) * Math.sqrt((x / l) ** 2 + (y / b) ** 2 + (z / h) ** 2);
    if (f > bis) continue;
    const n = [x, y, z].filter(Boolean).length;
    const typ = n === 1 ? 'axial' : n === 2 ? 'tangential' : 'schräg';
    const richtung = n === 1 ? (x ? 'Länge' : y ? 'Breite' : 'Höhe') : '';
    modes.push({ f, typ, richtung, idx: [x, y, z] });
  }
  modes.sort((a, c) => a.f - c.f);
  const axial = modes.filter((m) => m.typ === 'axial');
  // Häufungen: axiale Moden, die weniger als 5 % auseinanderliegen, verstärken sich gegenseitig.
  const haeufungen = [];
  for (let i = 1; i < axial.length; i++) {
    const a = axial[i - 1], c = axial[i];
    if ((c.f - a.f) / a.f < 0.05) haeufungen.push([a, c]);
  }
  // Lücken: große Abstände zwischen axialen Moden unter 120 Hz (dort fehlt Bass).
  const luecken = [];
  const unten = axial.filter((m) => m.f <= 120);
  for (let i = 1; i < unten.length; i++) if (unten[i].f - unten[i - 1].f > 20) luecken.push([unten[i - 1].f, unten[i].f]);
  const volumen = l * b * h;
  const schroeder = 2000 * Math.sqrt(0.4 / volumen);
  return { modes, axial, haeufungen, luecken, volumen, schroeder, tiefste: axial[0] };
}

/* ---------------------------------------------------------------- Subwoofer */

export const SUB_STUFEN = [
  { bis: 25, zoll: '8 Zoll (20 cm)', watt: '100–150 Watt', anzahl: 1 },
  { bis: 45, zoll: '10 Zoll (25 cm)', watt: '150–300 Watt', anzahl: 1 },
  { bis: 75, zoll: '12 Zoll (30 cm)', watt: '300–500 Watt', anzahl: 1 },
  { bis: 120, zoll: '12 bis 15 Zoll (30–38 cm)', watt: '400–800 Watt', anzahl: 1 },
  { bis: Infinity, zoll: '15 Zoll (38 cm) oder zwei 12-Zoll-Subwoofer', watt: 'ab 600 Watt', anzahl: 2 },
];
export function subwoofer({ flaecheM2 = 0, hoeheM = 2.5, offen = false }) {
  const volumen = flaecheM2 * hoeheM * (offen ? 1.5 : 1);
  const stufe = SUB_STUFEN.find((s) => volumen <= s.bis);
  return { volumen, ...stufe };
}

/* ---------------------------------------------------------------- Lautsprecherkabel */

export const KUPFER = 0.0175; // Ohm · mm² / m
export const QUERSCHNITTE = [0.75, 1, 1.5, 2.5, 4, 6, 10];

/** Faustregel: Der Widerstand von Hin- und Rückleiter soll höchstens 5 % der Lautsprecher-Impedanz betragen. */
export function kabelQuerschnitt({ laengeM = 0, ohm = 8, anteil = 0.05 }) {
  const minimum = (KUPFER * 2 * laengeM) / (anteil * ohm);
  const empfohlen = QUERSCHNITTE.find((q) => q >= minimum) || QUERSCHNITTE[QUERSCHNITTE.length - 1];
  const widerstand = (KUPFER * 2 * laengeM) / empfohlen;
  const verlust = widerstand / (widerstand + ohm);
  return { minimum, empfohlen, widerstand, verlust };
}

/* ---------------------------------------------------------------- HDMI-Bandbreite */

export const AUFLOESUNGEN = {
  '1080p': [1920, 1080],
  '1440p': [2560, 1440],
  '4k': [3840, 2160],
  '8k': [7680, 4320],
};
/** Nutzbare Datenrate der HDMI-Versionen in Gbit/s (nach Abzug der Leitungscodierung). */
export const HDMI_STUFEN = [
  { name: 'HDMI 1.4', max: 8.16, brutto: '10,2 Gbit/s', kabel: 'High Speed HDMI' },
  { name: 'HDMI 2.0', max: 14.4, brutto: '18 Gbit/s', kabel: 'Premium High Speed HDMI' },
  { name: 'HDMI 2.1 (40 Gbit/s)', max: 35.56, brutto: '40 Gbit/s', kabel: 'Ultra High Speed HDMI' },
  { name: 'HDMI 2.1 (48 Gbit/s)', max: 42.67, brutto: '48 Gbit/s', kabel: 'Ultra High Speed HDMI' },
];

/** Datenrate nach CVT-RB v2 (80 Pixel horizontale Austastlücke, mind. 460 µs vertikal), wie in den gängigen Tabellen. */
export function hdmiBandbreite({ aufloesung = '4k', hz = 60, bit = 8, farbe = 'rgb' }) {
  const [w, h] = AUFLOESUNGEN[aufloesung] || AUFLOESUNGEN['4k'];
  const vGesamt = Math.ceil(h / (1 - 460e-6 * hz));
  const hGesamt = w + 80;
  const pixeltakt = hGesamt * vGesamt * hz; // Hz
  const bpp = farbe === '422' ? 24 : farbe === '420' ? bit * 1.5 : bit * 3;
  const gbit = (pixeltakt * bpp) / 1e9;
  const stufe = HDMI_STUFEN.find((s) => gbit <= s.max) || null;
  return { gbit, pixeltaktMHz: pixeltakt / 1e6, bpp, stufe, dscNoetig: !stufe };
}
