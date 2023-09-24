import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint()
export class IsValidColorValidator implements ValidatorConstraintInterface {
  validate(color: any) {
    /* 
      - Valid colors all start with # and are 7 strictly characters long,
      all within the rage 0-f e.g. #FFFFFF

      - Transparent colors like #F74D4D40 are not allowed
    */
    if (typeof color !== 'string') return false;

    return /^#[0-9A-F]{6}$/i.test(color);
  }
}

export function IsValidColor(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidColorValidator,
    });
  };
}
