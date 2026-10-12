// Zentrale Konfiguration für Elektronik-Magazin
export const site = {
  name: 'Elektronik Magazin',
  domain: 'elektronik-magazin.com',
  url: 'https://elektronik-magazin.com',
  lang: 'de',
  tagline: 'Das Magazin für Techniker & Verbraucher – Tests, Praxis-Ratgeber und Online-Rechner.',
  youtube: 'https://www.youtube.com',
  amazonTag: 'elektr04-21', // Partner-Tag aus den bisherigen Beiträgen
  service: {
    name: 'Elektronik-Magazin Vor-Ort-Service',
    company: '',
    email: 'info@elektronik-magazin.com',
    phone: '0711 25266369',
    phoneLink: '+4971125266369',
    street: 'Zeppelinstraße 19',
    zip: '71332',
    city: 'Waiblingen',
    region: 'Baden-Württemberg',
    areas: ['Stuttgart', 'Rems-Murr-Kreis'],
    towns: ['Stuttgart', 'Waiblingen', 'Fellbach', 'Weinstadt', 'Schorndorf', 'Winnenden', 'Backnang', 'Remshalden', 'Kernen i.R.', 'Esslingen', 'Ludwigsburg'],
  },
  author: {
    name: 'Oliver Bechstein',
    image: '/bilder/oliver.webp',
    bio: 'Oliver Bechstein ist IT-Spezialist, Techniker und leitender Redakteur von Elektronik-Magazin. Seit vielen Jahren testet er Hardware, Heimkino-Systeme und Smart-Home-Technik im echten Praxiseinsatz.',
  },
  types: {
    test: { base: 'test', label: 'Testbericht', plural: 'Tests', more: 'Zum Test', intro: 'Ausführliche Praxistests mit ehrlicher Einschätzung.' },
    check: { base: 'check', label: 'Praxis-Check', plural: 'Checks', more: 'Zum Check', intro: 'Kompakte Ersteindrücke und Hardware-Checks.' },
    info: { base: 'ratgeber', label: 'Ratgeber', plural: 'Ratgeber', more: 'Zum Ratgeber', intro: 'Praxisnahes Technik-Wissen, Anleitungen und Kaufhilfen.' },
  },
  // Produkt-Kategorien für Tests und Checks (Kurzname = Kategorie im YT-Tool)
  categories: [
    { slug: 'audio', name: 'Kopfhörer & Audio', text: 'In-Ears, Kopfhörer und Lautsprecher', icon: 'check' },
    { slug: 'smartphone', name: 'Smartphones & Gadgets', text: 'Smartphones, Tablets, Tracker und Zubehör', icon: 'check' },
    { slug: 'netzwerk', name: 'WLAN & Netzwerk', text: 'Repeater, Router, Mesh und Powerline', icon: 'check' },
    { slug: 'pc', name: 'PC & Speicher', text: 'Festplatten, SSDs, Monitore und Zubehör', icon: 'check' },
    { slug: 'tv', name: 'TV & Heimkino', text: 'Fernseher, Soundbars und Streaming', icon: 'check' },
    { slug: 'haushalt', name: 'Haushalt & Saugroboter', text: 'Saugroboter, Küchen- und Haushaltsgeräte', icon: 'check' },
    { slug: 'smarthome', name: 'Smart Home', text: 'Kameras, Thermostate, Beleuchtung', icon: 'check' },
  ],
};
