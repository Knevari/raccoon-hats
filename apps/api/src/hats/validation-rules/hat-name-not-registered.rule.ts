import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { HatsService } from '../hats.service';
import { Injectable } from '@nestjs/common';

@ValidatorConstraint({ async: true })
@Injectable()
export class HatNameNotRegisteredValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly hatsService: HatsService) {}

  async validate(name: any) {
    const hat = await this.hatsService.getHatByName(name);
    return !Boolean(hat);
  }
}

export function HatNameNotRegistered(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: HatNameNotRegisteredValidator,
    });
  };
}
