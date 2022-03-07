import { Application, NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import ApiError from '../../../../../src/abstractions/ApiError';
import validationMiddleware from '../../../../../src/middleware/validate.middleware';
import * as responsehandler from '../../../../lib/response-handler';
import BaseApi from '../../BaseApi';
import CreateWordDto from '../dto/create-word.dto';
import service from '../service/dictionary.service';

/**
 * Dictionary controller
 */
export default class DictionaryController extends BaseApi {

    constructor(express: Application) {
        super();
        this.register(express);
    }

    public register(express: Application): void {
        express.use('/api/dictionary', this.router);
        this.router.get('/words', this.getWords);
        this.router.post('/addWord', validationMiddleware(CreateWordDto), this.addWord);
        this.router.delete('/deleteWord/:id', this.deleteWord);

    }

    public async getWords(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            res.locals.data = await service.getWords();
            responsehandler.send(res);
        } catch (err) {
            next(err);
        }
    }

    public async addWord({ body }: Request<{}, {}, CreateWordDto>, res: Response, next: NextFunction): Promise<void> {
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

}
