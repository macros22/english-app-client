import { DictionaryModel } from '../../dictionary/model/dictionary.model';
import AddWordToUserDto from '../dto/add-word-to-user.dto';
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

    // async deleteWord (id: string){

    //     // Check for existence.
    //     const existedWord = await UserDictionaryModel.findById(id);
    //     if(!existedWord) {
    //         return null;
    //     }

    //     const deletedWord = await UserDictionaryModel.findByIdAndDelete(id).exec();
    //     return  deletedWord;
    // }

    // async modifyWord (id: string, dto: AddWordToUserDto){

    //     // Check for existence.
    //     const existedWord = await UserDictionaryModel.findById(id);
    //     if(!existedWord) {
    //         return null;
    //     }

    //     const modifiedWord = await UserDictionaryModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    //     return  modifiedWord;
    // }
}

export default new UserDictionaryService();