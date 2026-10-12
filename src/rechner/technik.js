// Rechenlogik der Strom-, Akku-, Internet-, PC- und Haushalts-Rechner. Reine Funktionen, ohne Browser-Bezug.
import { bildMasse, zollAusBreite, FORMATE } from './heimkino.js';

/* ---------------------------------------------------------------- Standby-Kosten */

/** geraete: [{ watt, anzahl }]. Standby-Stunden pro Tag gelten für alle Geräte. */
export function standbyKosten({ geraete = [], stunden = 20, preisCent = 0 }) {
  const h = Math.min(24, Math.max(0, stunden));
  const zeilen = geraete.map((g) => {
    const kwh = (g.watt * g.anzahl * h * 365) / 1000;
    return { ...g, kwhJahr: kwh, kostenJahr: (kwh * preisCent) / 100 };
  });
  const watt = zeilen.reduce((s, z) => s + z.watt * z.anzahl, 0);
  const kwhJahr = zeilen.reduce((s, z) => s + z.kwhJahr, 0);
  return { zeilen, watt, kwhJahr, kostenJahr: (kwhJahr * preisCent) / 100 };
}

/* ---------------------------------------------------------------- Powerbank / Akku */

/** Nutzbare Energie einer Powerbank: Zellen-Wh × Wirkungsgrad (Spannungswandler, Wärme, Kabel). */
export function powerbank({ mah = 0, volt = 3.7, wirkungsgrad = 0.65, handyMah = 0, handyVolt = 3.85, geraetWatt = 0 }) {
  const wh = (mah * volt) / 1000;
  const nutzbar = wh * wirkungsgrad;
  const handyWh = (handyMah * handyVolt) / 1000;
  return {
    wh,
    nutzbar,
    handyWh,
    ladungen: handyWh > 0 ? nutzbar / handyWh : 0,
    stunden: geraetWatt > 0 ? nutzbar / geraetWatt : 0,
    flug: wh <= 100 ? 'ok' : wh <= 160 ? 'zustimmung' : 'verboten',
  };
}

/* ---------------------------------------------------------------- Fernseher Zoll in cm */

export const TV_ZOLL = [24, 32, 40, 43, 50, 55, 65, 75, 77, 83, 85, 98, 100];
/** Moderne Fernseher sind je Seite etwa 1 bis 1,5 cm breiter als das Bild. */
export const RAHMEN_CM = 1.5;

export function zollInCm({ zoll = 0, format = '16:9' }) {
  const b = bildMasse({ zoll, format });
  return { ...b, geraetBreite: b.breite + 2 * RAHMEN_CM };
}
/** Größter Fernseher, der auf eine Breite (cm) passt, z. B. Sideboard oder Nische. */
export function maxZollFuerBreite({ breiteCm = 0, format = '16:9' }) {
  const bild = Math.max(0, breiteCm - 2 * RAHMEN_CM);
  const zoll = zollAusBreite({ breiteCm: bild, format });
  const passend = TV_ZOLL.filter((z) => z <= zoll);
  return { zoll, groesster: passend.length ? passend[passend.length - 1] : null };
}

/* ---------------------------------------------------------------- Beamer-Projektionsabstand */

/** Throw Ratio = Abstand ÷ Bildbreite. */
export function projektionsabstand({ throwMin = 0, throwMax = 0, zoll = 0, format = '16:9' }) {
  const b = bildMasse({ zoll, format });
  const tMax = throwMax > 0 ? throwMax : throwMin;
  return { breite: b.breite, hoehe: b.hoehe, min: (throwMin * b.breite) / 100, max: (tMax * b.breite) / 100 };
}
export function bildAusAbstand({ throwMin = 0, throwMax = 0, abstandM = 0, format = '16:9' }) {
  const tMax = throwMax > 0 ? throwMax : throwMin;
  const breiteGross = throwMin > 0 ? (abstandM * 100) / throwMin : 0;
  const breiteKlein = tMax > 0 ? (abstandM * 100) / tMax : 0;
  return {
    zollMax: zollAusBreite({ breiteCm: breiteGross, format }),
    zollMin: zollAusBreite({ breiteCm: breiteKlein, format }),
    breiteMax: breiteGross,
    breiteMin: breiteKlein,
  };
}

/* ---------------------------------------------------------------- Download-Zeit und Datenraten */

export const GROESSE_BIT = { MB: 8e6, GB: 8e9, TB: 8e12 };
export const RATE_BIT = { 'kbit/s': 1e3, 'Mbit/s': 1e6, 'Gbit/s': 1e9, 'kB/s': 8e3, 'MB/s': 8e6, 'GB/s': 8e9, 'MiB/s': 8 * 1024 ** 2 };
/** Real kommen meist rund 90 % der gebuchten Geschwindigkeit an (Protokoll-Overhead, WLAN, Server). */
export const REAL_ANTEIL = 0.9;

export function downloadZeit({ groesse = 0, gEinheit = 'GB', rate = 0, rEinheit = 'Mbit/s' }) {
  const bits = groesse * (GROESSE_BIT[gEinheit] || 8e9);
  const bps = rate * (RATE_BIT[rEinheit] || 1e6);
  const sek = bps > 0 ? bits / bps : 0;
  return { sek, sekReal: sek / REAL_ANTEIL };
}
export function datenrate({ wert = 0, einheit = 'Mbit/s' }) {
  const bps = wert * (RATE_BIT[einheit] || 1e6);
  return Object.fromEntries(Object.entries(RATE_BIT).map(([k, f]) => [k, bps / f]));
}
/** Sekunden → „2 Std. 14 Min.“ */
export function dauerText(sek) {
  if (!(sek > 0)) return '–';
  if (sek < 60) return `${Math.max(1, Math.round(sek))} Sek.`;
  const min = Math.round(sek / 60);
  if (min < 60) return `${min} Min.`;
  const std = Math.floor(min / 60);
  if (std < 48) return `${std} Std. ${min % 60} Min.`;
  return `${Math.floor(std / 24)} Tage ${std % 24} Std.`;
}

/* ---------------------------------------------------------------- PPI */

/** Ab diesem Abstand sieht ein normales Auge (1 Bogenminute) keine einzelnen Pixel mehr. */
export function ppi({ breitePx = 0, hoehePx = 0, zoll = 0 }) {
  if (!(zoll > 0)) return null;
  const p = Math.sqrt(breitePx ** 2 + hoehePx ** 2) / zoll;
  const pitch = 25.4 / p;
  const retinaCm = (2.54 / (p * Math.tan(Math.PI / (180 * 60))));
  return { ppi: p, pitchMm: pitch, retinaCm, megapixel: (breitePx * hoehePx) / 1e6 };
}

/* ---------------------------------------------------------------- RAID */

export const RAID = {
  0: { name: 'RAID 0', min: 2, nutz: (n) => n, ausfall: () => 0, text: 'Schnell, aber ohne Ausfallschutz: Fällt eine Platte aus, sind alle Daten weg.' },
  1: { name: 'RAID 1', min: 2, nutz: () => 1, ausfall: (n) => n - 1, text: 'Spiegelung: Alle Platten enthalten dieselben Daten.' },
  5: { name: 'RAID 5', min: 3, nutz: (n) => n - 1, ausfall: () => 1, text: 'Eine Platte darf ausfallen. Guter Mittelweg für NAS mit 3 bis 5 Platten.' },
  6: { name: 'RAID 6', min: 4, nutz: (n) => n - 2, ausfall: () => 2, text: 'Zwei Platten dürfen gleichzeitig ausfallen. Sinnvoll bei vielen oder großen Platten.' },
  10: { name: 'RAID 10', min: 4, nutz: (n) => n / 2, ausfall: () => 1, text: 'Gespiegelte Paare, die zusammengeschaltet werden. Schnell und sicher, aber nur halbe Kapazität. Mindestens 1 Platte darf ausfallen, im besten Fall eine pro Paar.' },
};
export function raid({ anzahl = 0, tb = 0, level = '5' }) {
  const r = RAID[level];
  const n = Math.floor(anzahl);
  if (!r) return null;
  if (n < r.min) return { fehler: `${r.name} braucht mindestens ${r.min} Festplatten.` };
  if (level === '10' && n % 2) return { fehler: 'RAID 10 braucht eine gerade Anzahl an Festplatten.' };
  const nutzTb = r.nutz(n) * tb;
  return { name: r.name, text: r.text, nutzTb, nutzTib: (nutzTb * 1e12) / 1024 ** 4, brutto: n * tb, effizienz: nutzTb / (n * tb), ausfall: r.ausfall(n) };
}

/* ---------------------------------------------------------------- Saugroboter */

/** Flächenleistung in m² pro Minute (Richtwerte) und Anteil der Hersteller-Laufzeit je Saugstufe. */
export const ROBOTER_LEISTUNG = { saugen: 1.2, wischen: 0.8 };
export const ROBOTER_STUFE = { leise: 1, standard: 0.8, stark: 0.6, max: 0.4 };
/** Roboter fahren bei etwa 15 bis 20 % Restakku zur Station zurück. */
export const ROBOTER_RESERVE = 0.85;

export function saugroboter({ flaecheM2 = 0, laufzeitMin = 0, modus = 'saugen', stufe = 'standard', vieleMoebel = false }) {
  const leistung = (ROBOTER_LEISTUNG[modus] || 1.2) * (vieleMoebel ? 0.8 : 1);
  const bedarf = flaecheM2 / leistung;
  const proLadung = laufzeitMin * (ROBOTER_STUFE[stufe] || 0.8) * ROBOTER_RESERVE;
  const ladungen = proLadung > 0 ? Math.ceil(bedarf / proLadung) : 0;
  return { bedarf, proLadung, schafft: proLadung > 0 ? proLadung * leistung : 0, nachladen: Math.max(0, ladungen - 1), reicht: bedarf <= proLadung };
}

export { FORMATE };
