import { wordsApi } from 'libs/api/words.api';
import { useUser } from 'libs/hooks';
import { Role, WordMode } from 'libs/types/types';

export const useWordsApi = (wordsMode: WordMode) => {
    
    const { user } = useUser();
    const userRole = user?.role ? user.role : Role.USER;

    return {
        api: wordsApi(userRole, wordsMode)
    }
}