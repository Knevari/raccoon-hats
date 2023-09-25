export enum HatSize {
  "S",
  "M",
  "L",
  "XL",
  "XXL",
}

export enum HatStyle {
  "Army Cap",
  "Baseball & Sport Caps",
  "Beret",
  "Boater",
  "Bolero",
  "Bowler & Derby Hats",
  "Bucket Hat",
  "Cowboy Western",
  "Ear Warmer & Headbands",
  "Fashion Caps",
  "Fedora",
  "Fez",
  "Flat Cap",
  "Gambler",
  "Greek Fisherman Caps",
  "Hat Care",
  "Homburg",
  "Ivy Caps & Flat Caps",
  "Pull-Ons & Beanies",
}

export interface Hat {
  name: string;
  price: number;
  imageUrl: string;
  colors: string[];
  sizes: HatSize[];
  style: HatStyle;
}
