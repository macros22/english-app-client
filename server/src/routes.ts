import * as express from 'express';
import {DictionaryController, SystemStatusController} from './abstractions/components';

export default function registerRoutes(app: express.Application): void {
    new SystemStatusController(app);
    new DictionaryController(app);
}
