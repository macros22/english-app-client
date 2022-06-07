import { WordInCommonDictionaryModel } from '../../common-dictionary/model/common-dictionary.model';
import AddWordToUserDto from '../dto/add-word-to-user.dto';
import ModifyUserWordDto from '../dto/modidy-user-word.dto';
import { UserDictionaryModel } from '../model/user-dictionary.model';

export class UserDictionaryService {

    async getWords() {
        return await UserDictionaryModel.find();
    }


    // async addWord (userId, wordId){
    async addWord (userId,{ wordInCommonDictionaryId, word, translation, transcription, usageExamples, studyStatus}: AddWordToUserDto){
    
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
        
        // Todo - check if english wordInCommonDict === user word
        // ...
        //

        const newUserWord = new UserDictionaryModel({
            user: userId,
            wordInCommonDictionary: isWordInCommonDictionaryExist ? wordInCommonDictionaryId : null,
            userWord: {
                word,
                translation,
                transcription,
                usageExamples,
            },
            studyStatus,
          });
                
        const savedNewUserWord = await newUserWord.save();
        await (await savedNewUserWord.populate('user', '-password')).populate('wordInCommonDictionary');
       
        
        return savedNewUserWord;
    }

    async deleteWord (userId: string, wordId: string){        
        const deletedWord =  await UserDictionaryModel.findOneAndDelete({user: userId, word: wordId}).exec();
        return deletedWord;
    }

    async modifyWord (userId: string, wordId: string, dto: ModifyUserWordDto){        
        const modifiedWord =  await UserDictionaryModel.findOneAndUpdate({user: userId, word: wordId}, dto, { new: true }).exec();
        if(dto.wordInCommonDictionaryId){
            await modifiedWord.populate('wordInCommonDictionary')
        }
        return modifiedWord;
    }
}

export default new UserDictionaryService();