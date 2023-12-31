export type HatSize = "S" | "M" | "L" | "XL" | "XXL";

export type HatStyle =
  | "Army Cap"
  | "Baseball & Sport Caps"
  | "Beret"
  | "Boater"
  | "Bolero"
  | "Bowler & Derby Hats"
  | "Bucket Hat"
  | "Cowboy Western"
  | "Ear Warmer & Headbands"
  | "Fashion Caps"
  | "Fedora"
  | "Fez"
  | "Flat Cap"
  | "Gambler"
  | "Greek Fisherman Caps"
  | "Hat Care"
  | "Homburg"
  | "Ivy Caps & Flat Caps"
  | "Pull-Ons & Beanies";

export interface Hat {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  colors: string[];
  sizes: HatSize[];
  style: HatStyle;
  details: string;
}

export interface ValidationError {
  property: string;
  message: string;
}

export const availableHatSizes = ["S", "M", "L", "XL", "XXL"];

export const availableHatStyles = [
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
];
