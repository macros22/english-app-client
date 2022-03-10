import * as express from 'express';
import {AuthenticationController, DictionaryController, SystemStatusController} from './components';

export default function registerRoutes(app: express.Application): void {
    new SystemStatusController(app);
    new DictionaryController(app);
    new AuthenticationController(app);
}
