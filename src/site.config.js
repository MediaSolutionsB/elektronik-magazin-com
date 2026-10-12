// Zentrale Konfiguration für Elektronik-Magazin
export const site = {
  name: 'Elektronik Magazin',
  domain: 'elektronik-magazin.com',
  url: 'https://elektronik-magazin.com',
  lang: 'de',
  tagline: 'Das Magazin für Techniker & Verbraucher – Tests, Praxis-Ratgeber und Online-Rechner.',
  youtube: 'https://www.youtube.com',
  amazonTag: 'wwwonlinefitn-21',
  service: {
    name: 'Elektronik-Magazin Vor-Ort-Service',
    company: 'Bantle Media GmbH',
    email: 'info@elektronik-magazin.com',
    phone: '0711 25266369',
    phoneLink: '+4971125266369',
    street: 'Junkeräcker 28',
    zip: '71384',
    city: 'Weinstadt',
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
  categories: [
    { slug: 'ratgeber', name: 'Ratgeber', text: 'Tipps, Anleitungen und Kaufentscheidungen', icon: 'book' },
    { slug: 'tools', name: 'Tools & Rechner', text: 'Interaktive Stromkosten- und Umrechnungs-Tools', icon: 'calc' },
    { slug: 'tests', name: 'Tests & Reviews', text: 'Praxistests von Smartphones, Audio & Netzwerk', icon: 'check' },
  ],
};
