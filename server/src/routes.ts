import * as express from 'express';
import {DictionaryController, SystemStatusController} from './components';

export default function registerRoutes(app: express.Application): void {
    new SystemStatusController(app);
    new DictionaryController(app);
}
