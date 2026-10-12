// Liste aller Rechner (Übersicht, Menü, Sitemap, Querverweise).
// Die Adressen (slug) der ersten 7 Rechner sind die bisherigen Adressen aus WordPress und dürfen nicht geändert werden.
// gruppe: Themenblock auf der Übersicht. kategorie: passende Produkt-Kategorie (oder null).
export const gruppen = [
  { id: 'tv', name: 'Fernseher' },
  { id: 'heimkino', name: 'Beamer und Heimkino-Ton' },
  { id: 'strom', name: 'Strom, Akku und Licht' },
  { id: 'daten', name: 'Internet, PC und Speicher' },
];

export const tools = [
  // Fernseher
  { slug: 'sitzabstand-rechner-fernseher', name: 'Sitzabstand-Rechner für Fernseher', kurz: 'Der richtige Abstand zum TV, oder die passende TV-Größe zum Abstand.', gruppe: 'tv', kategorie: 'tv', icon: 'tv' },
  { slug: 'fernseher-zoll-in-cm-umrechnen', name: 'Fernseher Zoll in cm umrechnen', kurz: 'Diagonale, Breite und Höhe in cm, und welcher TV aufs Sideboard passt.', gruppe: 'tv', kategorie: 'tv', icon: 'ruler' },
  { slug: 'fernseher-montagehoehe-rechner', name: 'TV-Montagehöhe-Rechner', kurz: 'Wie hoch gehört der Fernseher an die Wand?', gruppe: 'tv', kategorie: 'tv', icon: 'tv' },
  { slug: 'blickwinkel-rechner-fernseher', name: 'Blickwinkel-Rechner', kurz: 'Wie viel Sichtfeld füllt der Fernseher? Mit SMPTE- und THX-Werten.', gruppe: 'tv', kategorie: 'tv', icon: 'angle' },
  { slug: 'seitenverhaeltnis-rechner-schwarze-balken', name: 'Seitenverhältnis-Rechner', kurz: 'Wie groß ist das Bild mit schwarzen Balken bei Kinofilmen?', gruppe: 'tv', kategorie: 'tv', icon: 'aspect' },
  { slug: 'fernseher-stromverbrauch-rechner', name: 'Fernseher-Stromverbrauch-Rechner', kurz: 'Was kostet dein LED-, QLED- oder OLED-Fernseher im Jahr?', gruppe: 'tv', kategorie: 'tv', icon: 'plug' },
  // Beamer und Heimkino-Ton
  { slug: 'leinwand-groesse-rechner', name: 'Leinwand-Größe-Rechner', kurz: 'Die passende Leinwanddiagonale zu Sitzabstand und Wandbreite.', gruppe: 'heimkino', kategorie: 'tv', icon: 'screen' },
  { slug: 'beamer-lumen-rechner', name: 'Beamer-Helligkeit-Rechner', kurz: 'Wie viele ANSI-Lumen braucht dein Beamer?', gruppe: 'heimkino', kategorie: 'tv', icon: 'projector' },
  { slug: 'beamer-projektionsabstand-rechner', name: 'Beamer-Projektionsabstand-Rechner', kurz: 'Wie weit muss der Beamer von der Wand weg?', gruppe: 'heimkino', kategorie: 'tv', icon: 'projector' },
  { slug: 'lautsprecher-aufstellung-rechner', name: 'Lautsprecher-Aufstellung (5.1, 7.1, Atmos)', kurz: 'Winkel und Abstände für jede Box, auch an der Decke.', gruppe: 'heimkino', kategorie: 'audio', icon: 'speaker' },
  { slug: 'raummoden-rechner', name: 'Raummoden-Rechner', kurz: 'Bei welchen Frequenzen dröhnt der Bass in deinem Raum?', gruppe: 'heimkino', kategorie: 'audio', icon: 'wave' },
  { slug: 'subwoofer-groesse-rechner', name: 'Subwoofer-Größe-Rechner', kurz: 'Welche Chassis-Größe und Leistung passt zum Raum?', gruppe: 'heimkino', kategorie: 'audio', icon: 'speaker' },
  { slug: 'lautsprecherkabel-querschnitt-rechner', name: 'Lautsprecherkabel-Rechner', kurz: 'Welcher Querschnitt in mm² für deine Kabellänge?', gruppe: 'heimkino', kategorie: 'audio', icon: 'cable' },
  { slug: 'hdmi-bandbreite-rechner', name: 'HDMI-Bandbreite-Rechner', kurz: 'Reicht HDMI 2.0, oder brauchst du HDMI 2.1?', gruppe: 'heimkino', kategorie: 'tv', icon: 'hdmi' },
  // Strom, Akku und Licht
  { slug: 'stromkosten-rechner', name: 'Stromkosten-Rechner', kurz: 'Was kostet ein Gerät am Tag, im Monat und im Jahr an Strom?', gruppe: 'strom', kategorie: null, icon: 'plug' },
  { slug: 'standby-kosten-rechner', name: 'Standby-Kosten-Rechner', kurz: 'Was kosten Fernseher, Konsole und Co. im Standby?', gruppe: 'strom', kategorie: null, icon: 'power' },
  { slug: 'watt-in-kwh-umrechnen', name: 'Watt in kWh umrechnen', kurz: 'Wie viele Kilowattstunden verbraucht ein Gerät in einer bestimmten Zeit?', gruppe: 'strom', kategorie: null, icon: 'bolt' },
  { slug: 'volt-watt-in-ampere-umrechnen', name: 'Volt, Watt und Ampere umrechnen', kurz: 'Spannung, Stromstärke oder Leistung aus zwei bekannten Werten berechnen.', gruppe: 'strom', kategorie: null, icon: 'ohm' },
  { slug: 'mwh-in-kwh-umrechnen', name: 'mWh, Wh, kWh und MWh umrechnen', kurz: 'Energie-Einheiten umrechnen und Akku-Kapazität von mAh in Wh.', gruppe: 'strom', kategorie: 'smartphone', icon: 'battery' },
  { slug: 'powerbank-rechner', name: 'Powerbank-Rechner', kurz: 'Wie oft lädt die Powerbank dein Handy? Darf sie ins Flugzeug?', gruppe: 'strom', kategorie: 'smartphone', icon: 'powerbank' },
  { slug: 'saugroboter-akku-rechner', name: 'Saugroboter-Akku-Rechner', kurz: 'Schafft der Akku deine Wohnung in einem Durchgang?', gruppe: 'strom', kategorie: 'haushalt', icon: 'robot' },
  { slug: 'lumen-in-watt-umrechnen-led', name: 'Lumen in Watt umrechnen (LED)', kurz: 'Wie viel Watt braucht eine LED für die gewünschte Helligkeit?', gruppe: 'strom', kategorie: null, icon: 'bulb' },
  // Internet, PC und Speicher
  { slug: 'download-zeit-rechner', name: 'Download-Zeit-Rechner', kurz: 'Wie lange dauert der Download bei deiner Geschwindigkeit?', gruppe: 'daten', kategorie: 'netzwerk', icon: 'download' },
  { slug: 'mbit-in-mb-umrechnen', name: 'Mbit/s in MB/s umrechnen', kurz: 'Internetgeschwindigkeit verstehen: Bit und Byte umrechnen.', gruppe: 'daten', kategorie: 'netzwerk', icon: 'speed' },
  { slug: 'rechner-kilobyte-kb-megabyte-mb-gigabyte-gb-und-terabyte-tb-umrechnen', name: 'kB, MB, GB und TB umrechnen', kurz: 'Datengrößen umrechnen, und warum Windows bei Festplatten weniger anzeigt.', gruppe: 'daten', kategorie: 'pc', icon: 'disk' },
  { slug: 'raid-rechner', name: 'RAID-Rechner', kurz: 'Nutzbarer Speicher mit RAID 0, 1, 5, 6 und 10.', gruppe: 'daten', kategorie: 'pc', icon: 'server' },
  { slug: 'ppi-rechner', name: 'PPI-Rechner', kurz: 'Pixeldichte von Monitor, Fernseher und Handy berechnen.', gruppe: 'daten', kategorie: 'pc', icon: 'grid' },
];
