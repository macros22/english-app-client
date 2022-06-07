import { WordInCommonDictionaryModel } from '../../common-dictionary/model/common-dictionary.model';
import AddWordToUserDto from '../dto/add-word-to-user.dto';
import ModifyUserWordDto from '../dto/modidy-user-word.dto';
import { UserDictionaryModel } from '../model/user-dictionary.model';

export class UserDictionaryService {

    async getWords() {
        return await UserDictionaryModel.find();
    }


    // async addWord (userId, wordId){
    async addWord (userId,{ wordInCommonDictionaryId, word, translation, transcription, usageExamples}: AddWordToUserDto){
    
        let isWordInCommonDictionaryExist = false;
       
        if(wordInCommonDictionaryId) {
            const existedWordInCommonDictionary = await WordInCommonDictionaryModel.findById(wordInCommonDictionaryId);

            isWordInCommonDictionaryExist = Boolean(existedWordInCommonDictionary);
            // Check for word existence in common dictionary.
            if(!isWordInCommonDictionaryExist) {
                return null;
            }else {
                isWordInCommonDictionaryExist = true;
            }
        }
        

        const newUserWord = new UserDictionaryModel({
            user: userId,
            wordInCommonDictionary: isWordInCommonDictionaryExist ? wordInCommonDictionaryId : null,
            userWord: {
                word,
                translation,
                transcription,
                usageExamples
            }
          });
                
        const savedNewUserWord = await newUserWord.save();
        
        
        // if(isWordInCommonDictionaryExist){
            await (await savedNewUserWord.populate('user', '-password')).populate('wordInCommonDictionary');
        // }else {
        //     await savedNewUserWord.populate('user', '-password');
        // }
        
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