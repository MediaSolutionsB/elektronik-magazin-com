// Liste aller Rechner (Übersicht, Menü, Sitemap, Querverweise).
// Die Adressen (slug) sind die bisherigen Adressen aus WordPress und dürfen nicht geändert werden.
// gruppe: Themenblock auf der Übersicht. kategorie: passende Produkt-Kategorie (oder null).
export const gruppen = [
  { id: 'strom', name: 'Strom und Energie' },
  { id: 'licht-tv', name: 'Licht und Fernseher' },
  { id: 'daten', name: 'Daten und Speicher' },
];

export const tools = [
  { slug: 'stromkosten-rechner', name: 'Stromkosten-Rechner', kurz: 'Was kostet ein Gerät am Tag, im Monat und im Jahr an Strom?', gruppe: 'strom', kategorie: null, icon: 'plug' },
  { slug: 'watt-in-kwh-umrechnen', name: 'Watt in kWh umrechnen', kurz: 'Wie viele Kilowattstunden verbraucht ein Gerät in einer bestimmten Zeit?', gruppe: 'strom', kategorie: null, icon: 'bolt' },
  { slug: 'volt-watt-in-ampere-umrechnen', name: 'Volt, Watt und Ampere umrechnen', kurz: 'Spannung, Stromstärke oder Leistung aus zwei bekannten Werten berechnen.', gruppe: 'strom', kategorie: null, icon: 'ohm' },
  { slug: 'mwh-in-kwh-umrechnen', name: 'mWh, Wh, kWh und MWh umrechnen', kurz: 'Energie-Einheiten umrechnen und Akku-Kapazität von mAh in Wh.', gruppe: 'strom', kategorie: 'smartphone', icon: 'battery' },
  { slug: 'lumen-in-watt-umrechnen-led', name: 'Lumen in Watt umrechnen (LED)', kurz: 'Wie viel Watt braucht eine LED für die gewünschte Helligkeit?', gruppe: 'licht-tv', kategorie: null, icon: 'bulb' },
  { slug: 'sitzabstand-rechner-fernseher', name: 'Sitzabstand-Rechner für Fernseher', kurz: 'Der richtige Abstand zum TV, oder die passende TV-Größe zum Abstand.', gruppe: 'licht-tv', kategorie: 'tv', icon: 'tv' },
  { slug: 'rechner-kilobyte-kb-megabyte-mb-gigabyte-gb-und-terabyte-tb-umrechnen', name: 'kB, MB, GB und TB umrechnen', kurz: 'Datengrößen umrechnen, und warum Windows bei Festplatten weniger anzeigt.', gruppe: 'daten', kategorie: 'pc', icon: 'disk' },
];
