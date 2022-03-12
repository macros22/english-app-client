
// import { IMiddleware } from './middleware.interface';
// import { NextFunction, Request, Response } from 'express';
// import { ClassConstructor, plainToClass } from 'class-transformer';
// import { validate } from 'class-validator';

// export class ValidateMiddleware implements IMiddleware {
// 	constructor(private classToValidate: ClassConstructor<object>) {}

// 	execute({ body }: Request, res: Response, next: NextFunction): void {
// 		const instance = plainToClass(this.classToValidate, body);
// 		validate(instance).then((errors) => {
// 			if (errors.length > 0) {
// 				res.status(422).send(errors);
// 			} else {
// 				next();
// 			}
// 		});
// 	}
// }


import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import * as express from 'express';
import HttpException from '../exceptions/http-exception';
 
function validationMiddleware<T>(type: any): express.RequestHandler {
  return (req, res, next) => {
    validate(plainToClass(type, req.body))
      .then((errors: ValidationError[]) => {
        if (errors.length > 0) {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
          next(new HttpException(400, message));
        } else {
          next();
        }
      });
  };
}
 
export default validationMiddleware;
