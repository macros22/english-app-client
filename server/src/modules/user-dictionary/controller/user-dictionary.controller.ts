import { Application, NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import ApiError from '../../../abstractions/ApiError';
import validationMiddleware from '../../../middleware/validate.middleware';
import * as responsehandler from '../../../lib/response-handler';
import BaseController from '../../BaseController';
import AddWordToUserDto from '../dto/add-word-to-user.dto';
import UserDictionaryService from '../service/user-dictionary.service';
import RequestWithUser from '../../../interfaces/request-with-user.interface';
import authMiddleware from '../../../middleware/auth.middleware';
import ModifyUserWordDto from '../dto/modidy-user-word.dto';

/**
 * User dictionary controller
 */
export default class DictionaryController extends BaseController {
    public path = '/api/user-dictionary';
    constructor(express: Application) {
        super();
        this.registerRoutes(express);
    }

    public registerRoutes(express: Application): void {
        express.use(this.path, this.router);
        this.router.use('/', authMiddleware);
        this.router.get('/words', this.getWords);
        this.router.post('/addWord', validationMiddleware(AddWordToUserDto), this.addWord);
        this.router.post('/modifyWord/:id', validationMiddleware(ModifyUserWordDto), this.modifyWord);
    }

    public async getWords(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            response.locals.data = await UserDictionaryService.getWords();
            responsehandler.send(response);
        } catch (error) {
            next(error);
        }
    }

    private addWord = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        const { wordId }: AddWordToUserDto = request.body;
        const userId = request.user._id;

        try {

          const addedUserWord = await UserDictionaryService.addWord(userId, wordId);
        
          if(!addedUserWord){
              throw new ApiError("Error! This word does not exist!", StatusCodes.BAD_REQUEST)
          }

          response.locals.data = addedUserWord;
          responsehandler.send(response);
        
      } catch(error) {
        next(error);
      }
    }


    // public async addWord({ body }: Request<{}, {}, CreateWordDto>, res: Response, next: NextFunction): Promise<void> {
    //     try {        
    //         const newWord = await service.addWord(body);
    //         if(!newWord) {
    //             throw new ApiError("Error! This word already exist!", StatusCodes.BAD_REQUEST)
    //         }

    //         res.locals.data = newWord;
    //         responsehandler.send(res);
        
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    // public async deleteWord(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {        
    //         const id  = req.params.id;
    //         if(!id) {
    //             throw new ApiError("Error! ID needed!", StatusCodes.BAD_REQUEST)
    //         }

    //         const deletedWord = await service.deleteWord(id);
    //         if(!deletedWord) {
    //             throw new ApiError("Error! This word does not exist!", StatusCodes.BAD_REQUEST)
    //         }

    //         res.locals.data = deletedWord;
    //         responsehandler.send(res);
        
    //     } catch (err) {
    //         next(err);
    //     }
    // }

    public async modifyWord({ body, params, user }: RequestWithUser, response: Response, next: NextFunction): Promise<void> {
        try {        
            const wordId  = params.id;
            const userId  = user._id;
            if(!wordId) {
                throw new ApiError("Error! Word ID needed!", StatusCodes.BAD_REQUEST)
            }

            const modifiedWord = await UserDictionaryService.modifyWord(userId, wordId, body);
            if(!modifiedWord) {
                throw new ApiError("Error! This word does not exist!", StatusCodes.BAD_REQUEST)
            }

            response.locals.data = modifiedWord;
            responsehandler.send(response);
        
        } catch (err) {
            next(err);
        }
    }

}
