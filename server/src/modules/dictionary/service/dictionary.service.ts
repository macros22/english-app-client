import AddWordDto from '../dto/add-word.dto';
import { WordInDictionaryModel } from '../model/dictionary.model';


export class DictionaryService {

    async getWords() {
        return await WordInDictionaryModel.find();
    }

    async addWord ({ word, translation, transcription, usageExamples}: AddWordDto){

        const existedWord = await WordInDictionaryModel.findOne({ word })

        // Check for existence.
        if(existedWord) {
            return null;
        }

        const newWord = new WordInDictionaryModel({ word, translation, transcription, usageExamples });
        
        await newWord.save();
    
        return newWord;
    }

    async deleteWord (id: string){

        // Check for existence.
        const existedWord = await WordInDictionaryModel.findById(id);
        if(!existedWord) {
            return null;
        }

        const deletedWord = await WordInDictionaryModel.findByIdAndDelete(id).exec();
        return  deletedWord;
    }

    async modifyWord (id: string, dto: AddWordDto){

        // Check for existence.
        const existedWord = await WordInDictionaryModel.findById(id);
        if(!existedWord) {
            return null;
        }

        const modifiedWord = await WordInDictionaryModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        return  modifiedWord;
    }
}

export default new DictionaryService();