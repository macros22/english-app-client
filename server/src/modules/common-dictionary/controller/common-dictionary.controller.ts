import { Application, NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import ApiError from '../../../abstractions/ApiError';
import validationMiddleware from '../../../middleware/validate.middleware';
import * as responsehandler from '../../../lib/response-handler';
import BaseController from '../../BaseController';
import AddWordDto from '../dto/add-word.dto';
import service from '../service/common-dictionary.service';


// Common Dictionary controller.

export default class DictionaryController extends BaseController {
    public path = '/api/dictionary';
    constructor(express: Application) {
        super();
        this.registerRoutes(express);
    }

    public registerRoutes(express: Application): void {
        express.use(this.path, this.router);
        this.router.get('/words', this.getWords);
        this.router.post('/addWord', validationMiddleware(AddWordDto), this.addWord);
        this.router.delete('/deleteWord/:id', this.deleteWord);
        this.router.patch('/modifyWord/:id', this.modifyWord);

    }

    public async getWords(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.locals.data = await service.getWords();
            responsehandler.send(res);
        } catch (err) {
            next(err);
        }
    }

    public async addWord({ body }: Request<{}, {}, AddWordDto>, res: Response, next: NextFunction): Promise<void> {
        try {        
            const newWord = await service.addWord(body);
            if(!newWord) {
                throw new ApiError("Error! This word already exist!", StatusCodes.BAD_REQUEST)
            }

            res.locals.data = newWord;
            responsehandler.send(res);
        
        } catch (err) {
            next(err);
        }
    }

    public async deleteWord(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {        
            const id  = req.params.id;
            if(!id) {
                throw new ApiError("Error! ID needed!", StatusCodes.BAD_REQUEST)
            }

            const deletedWord = await service.deleteWord(id);
            if(!deletedWord) {
                throw new ApiError("Error! This word does not exist!", StatusCodes.BAD_REQUEST)
            }

            res.locals.data = deletedWord;
            responsehandler.send(res);
        
        } catch (err) {
            next(err);
        }
    }

    public async modifyWord({ body, params }: Request<{ id:string }, {}, AddWordDto>, res: Response, next: NextFunction): Promise<void> {
        try {        
            const id  = params.id;
            if(!id) {
                throw new ApiError("Error! ID needed!", StatusCodes.BAD_REQUEST)
            }

            const modifiedWord = await service.modifyWord(id, body);
            if(!modifiedWord) {
                throw new ApiError("Error! This word does not exist!", StatusCodes.BAD_REQUEST)
            }

            res.locals.data = modifiedWord;
            responsehandler.send(res);
        
        } catch (err) {
            next(err);
        }
    }

}
