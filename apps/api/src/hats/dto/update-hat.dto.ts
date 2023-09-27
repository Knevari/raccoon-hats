import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { HatNameNotRegistered } from '../validation-rules/hat-name-not-registered.rule';
import { IsValidColor } from '../validation-rules/is-valid-color.rule';

import { HatSize, HatStyle } from '../types';
import { ApiPropertyOptional } from '@nestjs/swagger';

const fiveMb = 5 * 10 ** 6;

export const availableSizes: string[] = Object.keys(HatSize).filter((item) => {
  return isNaN(Number(item));
});

export const availableStyles: string[] = Object.keys(HatStyle).filter(
  (item) => {
    return isNaN(Number(item));
  },
);

export class UpdateHatDto {
  @ApiPropertyOptional({ example: 'Wool Mowbray' })
  @IsOptional()
  @IsNotEmpty({ message: 'The hat name should not be empty.' })
  @IsString({ message: 'You should provide a valid name for the hat.' })
  @HatNameNotRegistered({
    message: 'It appears you have already registered this hat.',
  })
  name?: string;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsNotEmpty({ message: "The hat 'price' should not be empty." })
  @Type(() => Number)
  @IsInt({
    message:
      "The hat 'price' should be a number representing the value in dollars",
  })
  price?: number;

  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  @IsOptional()
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
  image?: MemoryStoredFile;

  @ApiPropertyOptional({ example: ['L', 'XL', 'XXL'] })
  @IsOptional()
  @IsNotEmpty({
    message: 'You need to define the list of sizes available for this hat.',
  })
  @IsEnum(availableSizes, {
    message: `The hat 'style' should be one of the following: ${availableSizes}`,
    each: true,
  })
  sizes?: HatSize[];

  @ApiPropertyOptional({ example: ['#F74D4D', '#3E1D58'] })
  @IsOptional()
  @IsNotEmpty({
    message: 'You need to define the list of colors available for this hat.',
  })
  @IsString({ each: true })
  @IsValidColor({ each: true })
  colors?: string[];

  @ApiPropertyOptional({ example: 'Fashion Caps' })
  @IsOptional()
  @IsNotEmpty({
    message: "The hat 'style' should not be empty.",
  })
  @IsEnum(availableStyles, {
    message: `The hat 'style' should be one of the following: ${availableStyles}`,
  })
  style?: HatStyle;

  @ApiPropertyOptional({
    example:
      'Spectacular with autumn and winter wear, the Wool Mowbray by Kangol elevates pretty much any casual outfit. This premium quality pork pie hat is finished with perfection for that stylish and timeless look. It features a clean finish telescoping crown, a 1 3/4" brim, and a classic indent around the up-turned brim and tip of the hat. Refine your look today.',
  })
  @IsOptional()
  @IsNotEmpty({
    message: 'Provide clear details of the hat being registered.',
  })
  @IsString({ message: "Make sure 'details' is a string" })
  details?: string;
}
