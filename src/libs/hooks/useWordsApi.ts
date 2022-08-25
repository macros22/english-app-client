import { wordsApi } from 'libs/api/words.api';
import { useUser } from 'libs/hooks';
import { Role, WordsMode } from 'libs/types/types';

export const useWordsApi = (wordsMode: WordsMode) => {
    
    const { user } = useUser();
    const userRole = user?.role ? user.role : Role.USER;

    return {
        api: wordsApi({userRole, wordsMode})
    }
}