import * as express from 'express';
import {AuthenticationController, DictionaryController,UserDictionaryController,  SystemStatusController} from './modules';

export default function registerRoutes(app: express.Application): void {
    new SystemStatusController(app);
    new DictionaryController(app);
    new UserDictionaryController(app);
    new AuthenticationController(app);
}
