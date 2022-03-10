import * as bcrypt from 'bcrypt';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import BaseController from '../../BaseController';
import CreateUserDto from '../../user/dto/create-user.dto';
import userModel, { User } from '../../user/model/user.model';
import UserWithThatEmailAlreadyExistsException from '../../../exceptions/ UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../../../exceptions/wrong-credentials-exception';
import validationMiddleware from '../../../middleware/validate.middleware';
import LogInDto from '../dto/log-in.dto';

import DataStoredInToken from '../../../interfaces/data-stored-in-token.interface';
import TokenData from '../../../interfaces/token-data.interface';


export default class AuthenticationController extends BaseController {
  public path = '/api/auth';
  private user = userModel;

  constructor(express: express.Application) {
    super();
    this.register(express);
}

  // constructor() {
  //   this.initializeRoutes();
  // }


  public register(express: express.Application): void {
    express.use(this.path, this.router);
    
    this.router.post(`/register`, validationMiddleware(CreateUserDto), this.registration);
    this.router.post(`/login`, validationMiddleware(LogInDto), this.loggingIn);
    this.router.post(`/logout`, this.loggingOut);

}

  // private initializeRoutes() {
  //   this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
  //   this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
  //   this.router.post(`${this.path}/logout`, this.loggingOut);
  // }

 

  private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const userData: CreateUserDto = request.body;
    if (
      await this.user.findOne({ email: userData.email })
    ) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email));
    } else {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await this.user.create({
        ...userData,
        password: hashedPassword,
      });
      user.password = undefined;
      const tokenData = this.createToken(user);
      response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
      response.send(user);
    }
  }

  private loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const logInData: LogInDto = request.body;
    const user = await this.user.findOne({ email: logInData.email });
    if (user) {
      const isPasswordMatching = await bcrypt.compare(logInData.password, user.password);
      if (isPasswordMatching) {
        user.password = undefined;
        const tokenData = this.createToken(user);
        response.setHeader('Set-Cookie', [this.createCookie(tokenData)]);
        response.send(user);
      } else {
        next(new WrongCredentialsException());
      }
    } else {
      next(new WrongCredentialsException());
    }
  }

  private loggingOut = (request: express.Request, response: express.Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.send(200);
  }

  private createCookie(tokenData: TokenData) {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
  }

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60; // an hour
    // const secret = process.env.JWT_SECRET;
    const secret = "process.env.JWT_SECRET";
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    };
    return {
      expiresIn,
      token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
    };
  }

}
