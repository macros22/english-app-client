import * as express from 'express';

import BaseController from '../../BaseController';
import CreateUserDto from '../../user/dto/create-user.dto';
import UserWithThatEmailAlreadyExistsException from '../../../exceptions/ UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../../../exceptions/wrong-credentials-exception';
import validationMiddleware from '../../../middleware/validate.middleware';
import LogInDto from '../dto/log-in.dto';
import * as responsehandler from '../../../lib/response-handler';
import authenticationService from '../service/authentication.service';
import { NextFunction, Request, Response } from 'express';
import RequestWithUser from '../../../interfaces/request-with-user.interface';
import authMiddleware from '../../../middleware/auth.middleware';

export default class AuthenticationController extends BaseController {
  public path = '/api/auth';

  constructor(express: express.Application) {
    super();
    this.registerRoutes(express);
  }

  public registerRoutes(express: express.Application): void {
    express.use(this.path, this.router);
    
    this.router.post(`/register`, validationMiddleware(CreateUserDto), this.register);
    this.router.post(`/login`, validationMiddleware(LogInDto), this.login);
    this.router.get(`/me`, authMiddleware, this.me);
    this.router.post(`/logout`, this.logout);

  }

  private register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userData: CreateUserDto = req.body;

    const registerData  = await authenticationService.register(userData);

    if(!registerData) {
      next(new UserWithThatEmailAlreadyExistsException(userData.email));
    }

    const [newUser, cookie] = registerData

    res.locals.data = newUser;
    res.setHeader('Set-Cookie', [cookie as string]);
    responsehandler.send(res);
  }

  private login = async ({ body }: Request<{}, {}, LogInDto>, res: Response, next: NextFunction) => {

    const loginData = await authenticationService.login(body);

    if(!loginData) {
      next(new WrongCredentialsException());
    }

    const [user, cookie, token] = loginData

    res.locals.data = {user, accessToken: token};
    res.setHeader('Set-Cookie', [cookie as string]);
    responsehandler.send(res);

  }

  private me = async ({user}: RequestWithUser, res: Response, next: NextFunction) => {

    res.locals.data = {email: user.email};

    responsehandler.send(res);

  }

  private logout = (request: express.Request, response: express.Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.sendStatus(200);
  }

}
