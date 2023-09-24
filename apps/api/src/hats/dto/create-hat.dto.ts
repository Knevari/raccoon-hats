import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

import { IsValidColor } from '../validation-rules/is-valid-color.rule';
import { HatNameNotRegistered } from '../validation-rules/hat-name-not-registered.rule';

import { HatSize, HatStyle } from '../types';
import { Type } from 'class-transformer';

const fiveMb = 5 * 10 ** 6;

export const availableSizes: string[] = Object.keys(HatSize).filter((item) => {
  return isNaN(Number(item));
});

export const availableStyles: string[] = Object.keys(HatStyle).filter(
  (item) => {
    return isNaN(Number(item));
  },
);

export class CreateHatDto {
  @IsNotEmpty({ message: 'The hat name should not be empty.' })
  @IsString({ message: 'You should provide a valid name for the hat.' })
  @HatNameNotRegistered({
    message: 'It appears you have already registered this hat.',
  })
  name: string;

  @IsNotEmpty({ message: "The hat 'price' should not be empty." })
  @Type(() => Number)
  @IsInt({
    message:
      "The hat 'price' should be a number representing the value in dollars",
  })
  price: number;

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
  @MaxFileSize(fiveMb)
  image: MemoryStoredFile;

  @IsNotEmpty({
    message: 'You need to define the list of sizes available for this hat.',
  })
  @IsEnum(availableSizes, {
    message: `The hat 'style' should be one of the following: ${availableSizes}`,
    each: true,
  })
  sizes: HatSize[];

  @IsNotEmpty({
    message: 'You need to define the list of colors available for this hat.',
  })
  @IsString({ each: true })
  @IsValidColor({ each: true })
  colors: string[];

  @IsNotEmpty({
    message: "The hat 'style' should not be empty.",
  })
  @IsEnum(availableStyles, {
    message: `The hat 'style' should be one of the following: ${availableStyles}`,
  })
  style: HatStyle;

  @IsNotEmpty({
    message: 'Provide clear details of the hat being registered.',
  })
  @IsString({ message: "Make sure 'details' is a string" })
  details: string;
}
