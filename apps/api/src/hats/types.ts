export enum HatStyle {
  'Army Cap',
  'Baseball & Sport Caps',
  'Beret',
  'Boater',
  'Bolero',
  'Bowler & Derby Hats',
  'Bucket Hat',
  'Cowboy Western',
  'Ear Warmer & Headbands',
  'Fashion Caps',
  'Fedora',
  'Fez',
  'Flat Cap',
  'Gambler',
  'Greek Fisherman Caps',
  'Hat Care',
  'Homburg',
  'Ivy Caps & Flat Caps',
  'Pull-Ons & Beanies',
}

export enum HatSize {
  'S',
  'M',
  'L',
  'XL',
  'XXL',
}

export const availableSizes: string[] = Object.keys(HatSize).filter((item) => {
  return isNaN(Number(item));
});

export const availableStyles: string[] = Object.keys(HatStyle).filter(
  (item) => {
    return isNaN(Number(item));
  },
);
