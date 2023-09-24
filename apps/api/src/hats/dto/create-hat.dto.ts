import { IsEnum, IsString } from 'class-validator';
import { HatNameNotRegistered } from '../validation-rules/hat-name-not-registered.rule';
import { HatStyle } from '../types';
import { IsValidColor } from '../validation-rules/is-valid-color.rule';

export class CreateHatDto {
  @IsString({ message: 'You should provide a valid name for the hat.' })
  @HatNameNotRegistered()
  name: string;

  @IsString()
  image: string;

  @IsString({ each: true })
  sizes: string[];

  @IsString({ each: true })
  @IsValidColor({ each: true })
  colors: string[];

  @IsEnum(HatStyle)
  style: HatStyle;

  @IsString()
  details: string;
}
