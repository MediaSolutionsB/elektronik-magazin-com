// Rechenlogik aller Rechner. Reine Funktionen ohne Browser-Bezug, damit sie getestet werden können.

const WOCHEN_PRO_JAHR = 365 / 7;

/** Stromkosten eines Geräts. Standby läuft in allen Stunden, in denen das Gerät nicht in Betrieb ist. */
export function stromkosten({ watt = 0, stunden = 0, tage = 7, preisCent = 0, standbyWatt = 0 }) {
  const h = Math.min(24, Math.max(0, stunden));
  const t = Math.min(7, Math.max(0, tage));
  const betriebWoche = (watt * h * t) / 1000;
  const standbyWoche = (standbyWatt * (7 * 24 - h * t)) / 1000;
  const kwhJahr = (betriebWoche + standbyWoche) * WOCHEN_PRO_JAHR;
  const euro = (kwh) => (kwh * preisCent) / 100;
  return {
    kwhTag: kwhJahr / 365,
    kwhMonat: kwhJahr / 12,
    kwhJahr,
    kostenTag: euro(kwhJahr / 365),
    kostenMonat: euro(kwhJahr / 12),
    kostenJahr: euro(kwhJahr),
    anteilStandby: kwhJahr > 0 ? (standbyWoche * WOCHEN_PRO_JAHR) / kwhJahr : 0,
  };
}

/** Watt × Stunden → kWh und umgekehrt. */
export function wattInKwh({ watt = 0, stunden = 1 }) {
  return (watt * stunden) / 1000;
}
export function kwhInWatt({ kwh = 0, stunden = 1 }) {
  return stunden > 0 ? (kwh * 1000) / stunden : 0;
}

/** P = U × I. gesucht: 'ampere' | 'volt' | 'watt'. */
export function ohmLeistung({ gesucht, watt = 0, volt = 0, ampere = 0 }) {
  if (gesucht === 'ampere') return volt > 0 ? { watt, volt, ampere: watt / volt } : null;
  if (gesucht === 'volt') return ampere > 0 ? { watt, ampere, volt: watt / ampere } : null;
  if (gesucht === 'watt') return { volt, ampere, watt: volt * ampere };
  return null;
}

/** Energie-Einheiten in Wattstunden. */
export const ENERGIE = { mWh: 0.001, Wh: 1, kWh: 1000, MWh: 1e6 };
export function energieUmrechnen({ wert = 0, einheit = 'kWh' }) {
  const wh = wert * (ENERGIE[einheit] || 1);
  return Object.fromEntries(Object.entries(ENERGIE).map(([k, f]) => [k, wh / f]));
}

/** Akku: mAh und Nennspannung → Wh. Flug-Regel (Handgepäck): bis 100 Wh erlaubt, 100–160 Wh mit Zustimmung der Airline. */
export function akkuWh({ mah = 0, volt = 3.7 }) {
  const wh = (mah * volt) / 1000;
  return { wh, mwh: wh * 1000, flug: wh <= 100 ? 'ok' : wh <= 160 ? 'zustimmung' : 'verboten' };
}

/** Helligkeit alter Glühlampen (EU-Vergleichstabelle): Watt → Lumen. */
export const GLUEHLAMPE = [
  [15, 136], [25, 249], [40, 470], [60, 806], [75, 1055], [100, 1521], [150, 2452], [200, 3452],
];
/** Lumen → LED-Watt (über Lichtausbeute in lm/W) und vergleichbare Glühlampe. */
export function lumenInWatt({ lumen = 0, lmProWatt = 100 }) {
  const ledWatt = lmProWatt > 0 ? lumen / lmProWatt : 0;
  let gluehWatt;
  const t = GLUEHLAMPE;
  if (lumen <= t[0][1]) gluehWatt = (lumen / t[0][1]) * t[0][0];
  else if (lumen >= t[t.length - 1][1]) gluehWatt = (lumen / t[t.length - 1][1]) * t[t.length - 1][0];
  else {
    const i = t.findIndex(([, lm]) => lm >= lumen);
    const [w0, l0] = t[i - 1];
    const [w1, l1] = t[i];
    gluehWatt = w0 + ((lumen - l0) / (l1 - l0)) * (w1 - w0);
  }
  return { ledWatt, gluehWatt, ersparnis: gluehWatt > 0 ? 1 - ledWatt / gluehWatt : 0 };
}

/** Sitzabstand: Faktor × Bildschirmdiagonale. Spielraum ±20 %. */
export const SITZ_FAKTOR = { '8k': 1.0, '4k': 1.5, fhd: 1.8, hd: 2.1 };
export const TV_GROESSEN = [32, 40, 43, 48, 50, 55, 58, 65, 75, 77, 83, 85, 98, 100];
export function sitzabstand({ zoll = 0, aufloesung = '4k' }) {
  const f = SITZ_FAKTOR[aufloesung] || 1.5;
  const diagonaleCm = zoll * 2.54;
  const ideal = diagonaleCm * f;
  return { diagonaleCm, ideal, min: ideal * 0.8, max: ideal * 1.2 };
}
/** Umgekehrt: passende TV-Größe für einen Sitzabstand (cm). */
export function tvGroesse({ abstandCm = 0, aufloesung = '4k' }) {
  const f = SITZ_FAKTOR[aufloesung] || 1.5;
  const ideal = abstandCm / (f * 2.54);
  const bereich = [abstandCm / (1.2 * f * 2.54), abstandCm / (0.8 * f * 2.54)];
  const passend = TV_GROESSEN.filter((z) => z >= bereich[0] && z <= bereich[1]);
  const naechste = TV_GROESSEN.reduce((a, b) => (Math.abs(b - ideal) < Math.abs(a - ideal) ? b : a));
  return { idealZoll: ideal, minZoll: bereich[0], maxZoll: bereich[1], passend, naechste };
}

/** Datengrößen: dezimal (Hersteller, 1 kB = 1000 Byte) und binär (Windows, 1 KiB = 1024 Byte). */
export const DEZ = { B: 1, kB: 1e3, MB: 1e6, GB: 1e9, TB: 1e12 };
export const BIN = { B: 1, KiB: 1024, MiB: 1024 ** 2, GiB: 1024 ** 3, TiB: 1024 ** 4 };
export function datengroesse({ wert = 0, einheit = 'GB' }) {
  const bytes = wert * (DEZ[einheit] || BIN[einheit] || 1);
  return {
    bytes,
    dez: Object.fromEntries(Object.entries(DEZ).map(([k, f]) => [k, bytes / f])),
    bin: Object.fromEntries(Object.entries(BIN).map(([k, f]) => [k, bytes / f])),
  };
}
