import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { HatsService } from '../hats.service';

@ValidatorConstraint({ async: true })
export class HatNameNotRegisteredValidator
  implements ValidatorConstraintInterface
{
  constructor(private readonly hatsService: HatsService) {}

  async validate(name: any) {
    const hat = await this.hatsService.getHatByName(name);
    return hat === undefined;
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
