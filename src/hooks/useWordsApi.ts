import { wordsApi } from 'libs/words.api';
import { useUser } from 'hooks';
import { Role, WordMode } from 'types/types';

export const useWordsApi = (wordsMode: WordMode) => {
    
    const { user } = useUser();
    const userRole = user?.role ? user.role : Role.USER;

    return {
        api: wordsApi(userRole, wordsMode)
    }
}