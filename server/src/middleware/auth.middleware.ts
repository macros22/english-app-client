import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import RequestWithUser from '../interfaces/request-with-user.interface';
import userModel from '../modules/user/model/user.model';
import DataStoredInToken from '../interfaces/data-stored-in-token.interface';
import AuthenticationTokenMissingException from '../exceptions/authentication-token-missing-exception';
import WrongAuthenticationTokenException from '../exceptions/wrong-authentication-token.exception';
 
async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
  const { cookies } = request;
  if (cookies && cookies.Authorization) {
    // const secret = process.env.JWT_SECRET;
    const secret = "process.env.JWT_SECRET";
    try {
      const verificationResponse = jwt.verify(cookies.Authorization, secret) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);

      if (user) {
 
        request.user = user;
        next();
      } else {
        
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
     
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}
 
export default authMiddleware;