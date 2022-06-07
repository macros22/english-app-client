import AddWordDto from '../dto/add-word.dto';
import { WordInCommonDictionaryModel } from '../model/common-dictionary.model';


export class DictionaryService {

    async getWords() {
        return await WordInCommonDictionaryModel.find();
    }

    async addWord ({ word, translation, transcription, usageExamples}: AddWordDto){

        const existedWord = await WordInCommonDictionaryModel.findOne({ word })

        // Check for existence.
        if(existedWord) {
            return null;
        }

        const newWord = new WordInCommonDictionaryModel({ word, translation, transcription, usageExamples });
        
        await newWord.save();
    
        return newWord;
    }

    async deleteWord (id: string){

        // Check for existence.
        const existedWord = await WordInCommonDictionaryModel.findById(id);
        if(!existedWord) {
            return null;
        }

        const deletedWord = await WordInCommonDictionaryModel.findByIdAndDelete(id).exec();
        return  deletedWord;
    }

    async modifyWord (id: string, dto: AddWordDto){

        // Check for existence.
        const existedWord = await WordInCommonDictionaryModel.findById(id);
        if(!existedWord) {
            return null;
        }

        const modifiedWord = await WordInCommonDictionaryModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        return  modifiedWord;
    }
}

export default new DictionaryService();