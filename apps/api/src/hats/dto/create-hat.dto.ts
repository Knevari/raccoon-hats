import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { IsValidColor } from '../validation-rules/is-valid-color.rule';
import { HatNameNotRegistered } from '../validation-rules/hat-name-not-registered.rule';

import { HatStyle } from '../types';

export class CreateHatDto {
  @IsNotEmpty({ message: 'The hat name should not be empty.' })
  @IsString({ message: 'You should provide a valid name for the hat.' })
  @HatNameNotRegistered({
    message: 'It appears you have already registered this hat.',
  })
  name: string;

  @IsNotEmpty({ message: 'You should provide a valid image for the hat.' })
  @IsFile({ message: "'image' should be a valid file" })
  @HasMimeType([
    'image/jpeg',
    'image/png',
    'image/x-png',
    'image/svg+xml',
    'image/webp',
    'image/avif',
  ])
  image: MemoryStoredFile;

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
    message: "The hat 'style' should not be empty.",
  })
  @IsEnum(HatStyle)
  style: HatStyle;

  @IsNotEmpty({
    message: 'Provide clear details of the hat being registered.',
  })
  @IsString({ message: "Make sure 'details' is a string" })
  details: string;
}
