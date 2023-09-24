import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { HatNameNotRegistered } from '../validation-rules/hat-name-not-registered.rule';
import { HatStyle } from '../types';
import { IsValidColor } from '../validation-rules/is-valid-color.rule';

export class CreateHatDto {
  @IsNotEmpty({ message: 'name should not be empty' })
  @IsString({ message: 'You should provide a valid name for the hat.' })
  @HatNameNotRegistered()
  name: string;

  @IsNotEmpty({
    message: 'You need to define the list of sizes available for this hat.',
  })
  @IsString({ each: true })
  sizes: string[];

  @IsNotEmpty({
    message: 'You need to define the list of colors available for this hat.',
  })
  @IsString({ each: true })
  @IsValidColor({ each: true })
  colors: string[];

  @IsNotEmpty({
    message: 'The hat style should be one of the following ' + HatStyle,
  })
  @IsEnum(HatStyle)
  style: HatStyle;

  @IsNotEmpty({
    message: 'Provide a clear description of the hat being registered.',
  })
  @IsString()
  details: string;
}
