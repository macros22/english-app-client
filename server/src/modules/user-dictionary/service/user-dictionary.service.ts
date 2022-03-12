import { DictionaryModel } from '../../dictionary/model/dictionary.model';
import ModifyUserWordDto from '../dto/modidy-user-word.dto';
import { UserDictionaryModel } from '../model/user-dictionary.model';

export class UserDictionaryService {

    async getWords() {
        return await UserDictionaryModel.find();
    }


    async addWord (userId, wordId){

        // const existedWord = await UserDictionaryModel.findOne({ word: wordId })
        const existedWordInCommonDictionary = await DictionaryModel.findById(wordId)

        // Check for word existence in common dictionary.
        if(!existedWordInCommonDictionary) {
            return null;
        }

        const newUserWord = new UserDictionaryModel({
            user: userId,
            word: wordId,
          });
                
        const savedNewUserWord = await newUserWord.save();
        await (await savedNewUserWord.populate('user', '-password')).populate('word');
    
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