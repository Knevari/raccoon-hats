import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';

import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';

import { HatNameNotRegistered } from '../validation-rules/hat-name-not-registered.rule';
import { IsValidColor } from '../validation-rules/is-valid-color.rule';

import { HatSize, HatStyle, availableSizes, availableStyles } from '../types';
import { ApiProperty } from '@nestjs/swagger';

const fiveMb = 5 * 10 ** 6;

export class CreateHatDto {
  @ApiProperty({ example: 'Wool Mowbray' })
  @IsNotEmpty({ message: 'The hat name should not be empty.' })
  @IsString({ message: 'You should provide a valid name for the hat.' })
  @HatNameNotRegistered({
    message: 'It appears you have already registered this hat.',
  })
  name: string;

  @ApiProperty({ example: 50 })
  @IsNotEmpty({ message: "The hat 'price' should not be empty." })
  @Type(() => Number)
  @IsInt({
    message:
      "The hat 'price' should be a number representing the value in dollars",
  })
  price: number;

  @ApiProperty({ type: 'string', format: 'binary' })
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

  @ApiProperty({ example: ['L', 'XL', 'XXL'] })
  @IsNotEmpty({
    message: 'You need to define the list of sizes available for this hat.',
  })
  @IsEnum(availableSizes, {
    message: `The hat 'style' should be one of the following: ${availableSizes}`,
    each: true,
  })
  sizes: HatSize[];

  @ApiProperty({ example: ['#F74D4D', '#3E1D58'] })
  @IsNotEmpty({
    message: 'You need to define the list of colors available for this hat.',
  })
  @IsString({ each: true })
  @IsValidColor({ each: true })
  colors: string[];

  @ApiProperty({ example: 'Fashion Caps' })
  @IsNotEmpty({
    message: "The hat 'style' should not be empty.",
  })
  @IsEnum(availableStyles, {
    message: `The hat 'style' should be one of the following: ${availableStyles}`,
  })
  style: HatStyle;

  @ApiProperty({
    example:
      'Spectacular with autumn and winter wear, the Wool Mowbray by Kangol elevates pretty much any casual outfit. This premium quality pork pie hat is finished with perfection for that stylish and timeless look. It features a clean finish telescoping crown, a 1 3/4" brim, and a classic indent around the up-turned brim and tip of the hat. Refine your look today.',
  })
  @IsNotEmpty({
    message: 'Provide clear details of the hat being registered.',
  })
  @IsString({ message: "Make sure 'details' is a string" })
  details: string;
}
