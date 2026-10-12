// Prüft die Rechenlogik mit Beispielwerten, die von Hand nachgerechnet sind.
import * as L from '../src/rechner/logic.js';
let fail = 0;
const near = (name, ist, soll, tol = 0.01) => { if (Math.abs(ist - soll) > tol) { fail++; console.log('FEHLER', name, ist, '≠', soll); } else console.log('ok   ', name); };

// 100 W, 4 h täglich, 7 Tage, 35 ct: 0,4 kWh/Tag → 146 kWh/Jahr → 51,10 €
let s = L.stromkosten({ watt: 100, stunden: 4, tage: 7, preisCent: 35 });
near('Strom kWh/Jahr', s.kwhJahr, 146, 0.01); near('Strom €/Jahr', s.kostenJahr, 51.1, 0.01); near('Strom €/Monat', s.kostenMonat, 4.258, 0.01);
// Router 10 W rund um die Uhr: 87,6 kWh/Jahr → 30,66 €
s = L.stromkosten({ watt: 10, stunden: 24, tage: 7, preisCent: 35 }); near('Router kWh/Jahr', s.kwhJahr, 87.6, 0.01);
// TV 100 W 4 h an 5 Tagen + 0,5 W Standby: Woche 2 kWh + 0,5*(168-20)/1000=0,074 → ×52,142857
s = L.stromkosten({ watt: 100, stunden: 4, tage: 5, preisCent: 30, standbyWatt: 0.5 }); near('TV mit Standby kWh/Jahr', s.kwhJahr, 2.074 * 365 / 7, 0.001);
near('Watt→kWh', L.wattInKwh({ watt: 2000, stunden: 1.5 }), 3); near('kWh→Watt', L.kwhInWatt({ kwh: 3, stunden: 1.5 }), 2000);
near('Ampere', L.ohmLeistung({ gesucht: 'ampere', watt: 2300, volt: 230 }).ampere, 10);
near('Volt', L.ohmLeistung({ gesucht: 'volt', watt: 60, ampere: 5 }).volt, 12);
near('Watt', L.ohmLeistung({ gesucht: 'watt', volt: 5, ampere: 3 }).watt, 15);
const e = L.energieUmrechnen({ wert: 5, einheit: 'MWh' }); near('MWh→kWh', e.kWh, 5000); near('MWh→mWh', e.mWh, 5e9);
near('mWh→kWh', L.energieUmrechnen({ wert: 74000, einheit: 'mWh' }).kWh, 0.074, 1e-9);
const a = L.akkuWh({ mah: 20000, volt: 3.7 }); near('Powerbank Wh', a.wh, 74); if (a.flug !== 'ok') { fail++; console.log('FEHLER Flug'); }
if (L.akkuWh({ mah: 30000, volt: 3.85 }).flug !== 'zustimmung') { fail++; console.log('FEHLER Flug 115 Wh'); } else console.log('ok    Flug 115 Wh');
let l = L.lumenInWatt({ lumen: 806, lmProWatt: 100 }); near('806 lm LED', l.ledWatt, 8.06); near('806 lm Glühlampe', l.gluehWatt, 60);
l = L.lumenInWatt({ lumen: 638, lmProWatt: 100 }); near('638 lm Glühlampe (zwischen 40 und 60 W)', l.gluehWatt, 50, 0.01);
const t = L.sitzabstand({ zoll: 55, aufloesung: '4k' }); near('55" 4K ideal', t.ideal, 209.55); near('55" 4K min', t.min, 167.64);
near('32" FHD ideal (wie alte Tabelle 146,4)', L.sitzabstand({ zoll: 32, aufloesung: 'fhd' }).ideal, 146.304, 0.01);
const g = L.tvGroesse({ abstandCm: 250, aufloesung: '4k' }); near('250 cm 4K ideal Zoll', g.idealZoll, 65.62, 0.01); if (g.naechste !== 65) { fail++; console.log('FEHLER nächste', g.naechste); } else console.log('ok    nächste Größe 65');
const d = L.datengroesse({ wert: 1, einheit: 'TB' }); near('1 TB in GiB', d.bin.GiB, 931.32, 0.01); near('1 TB in TiB', d.bin.TiB, 0.9095, 0.0001); near('1 TB in MB', d.dez.MB, 1e6);
console.log(fail ? `\n${fail} FEHLER` : '\nAlle Rechner-Tests bestanden.');
process.exit(fail ? 1 : 0);
