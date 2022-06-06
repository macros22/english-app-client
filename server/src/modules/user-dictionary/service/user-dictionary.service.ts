import { WordInDictionaryModel } from '../../dictionary/model/dictionary.model';
import AddWordToUserDto from '../dto/add-word-to-user.dto';
import ModifyUserWordDto from '../dto/modidy-user-word.dto';
import { UserDictionaryModel } from '../model/user-dictionary.model';


var ObjectId = require('mongoose').Types.ObjectId;
export class UserDictionaryService {

    async getWords() {
        return await UserDictionaryModel.find();
    }


    // async addWord (userId, wordId){
    async addWord (userId,{ wordFromCommonDictionaryId, word, translation, transcription, usageExamples}: AddWordToUserDto){
    
        let isWordFromCommonDictionaryExist = false;
        
        if(wordFromCommonDictionaryId && ObjectId.isValid(wordFromCommonDictionaryId)) {
            const existedWordFromCommonDictionary = await WordInDictionaryModel.findById(wordFromCommonDictionaryId);

            isWordFromCommonDictionaryExist = Boolean(existedWordFromCommonDictionary);
            // Check for word existence in common dictionary.
            if(!isWordFromCommonDictionaryExist) {
                return null;
            }
        }
        

        
        const newUserWord = new UserDictionaryModel({
            user: userId,
            wordFromCommonDictionary: wordFromCommonDictionaryId || "d",
            userWord: {
                word,
                translation,
                transcription,
                usageExamples
            }
          });
                
        const savedNewUserWord = await newUserWord.save();
        await (await savedNewUserWord.populate('user', '-password')).populate('wordFromCommonDictionary');
        
        
        return savedNewUserWord;
    }

    async deleteWord (userId: string, wordId: string){        
        return  await UserDictionaryModel.findOneAndDelete({user: userId, word: wordId});
    }

    async modifyWord (userId: string, wordId: string, dto: ModifyUserWordDto){        
        return  await UserDictionaryModel.findOneAndUpdate({user: userId, word: wordId}, dto, { new: true });
    }
}

export default new UserDictionaryService();