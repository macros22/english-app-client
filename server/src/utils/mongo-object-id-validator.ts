// https://github.com/typestack/class-validator/issues/630
// https://github.com/quantumsheep/class-validator-mongo-object-id/blob/master/src/index.ts

import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

import { isValidObjectId } from 'mongoose';

export function IsMongoObjectId(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsMongoObjectId",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    return isValidObjectId(value)
                }
            }
        });
   };
}