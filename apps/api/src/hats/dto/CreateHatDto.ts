import { HatStyle } from '../types';

export class CreateHatDto {
  name: string;
  image: string;
  sizes: string[];
  colors: string[];
  style: HatStyle;
  details: string;
}
