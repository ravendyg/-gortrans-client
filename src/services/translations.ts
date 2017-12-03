export const availableTranslations = ['ru', 'en'];

export function getTranslation(lang: string, key: string) {
  const holder = values[key];
  return holder ? holder[lang] || '' : '';
}

export const values: { [index: string]: { [index: string]: string } } = {
  searchInputPlaceholder: {
    ru: 'Номер маршрута',
    en: 'Route number',
  },
  'vehicle-name-0': {
    ru: 'Автобус',
    en: 'Bus',
  },
  'vehicle-name-1': {
    ru: 'Троллейбус',
    en: 'Trolleybus',
  },
  'vehicle-name-2': {
    ru: 'Трамвай',
    en: 'Tram',
  },
  'vehicle-name-7': {
    ru: 'Маршрутка',
    en: 'Small bus',
  },
};

