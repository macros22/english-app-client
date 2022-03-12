import { Application, Router } from 'express';

/**
 * Provides services common to all API methods
 */
export default abstract class Controller {
    protected router: Router;

    protected constructor() {
      this.router = Router();
    }

    public abstract registerRoutes(express: Application): void;
}
