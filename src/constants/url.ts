export const BASE_URL = 'https://node-express-t-prod-nodejs-express-ts-gsiguz.mo2.mogenius.io/'

// Auth.
export const SIGN_IN_URL = BASE_URL + 'login';
export const SIGN_UP_URL = BASE_URL + 'auth/register';
export const LOGOUT_URL = BASE_URL + 'logout';
export const AUTH_ME_URL = BASE_URL + 'me';

// Common words.
export const GET_COMMON_WORDS_URL = BASE_URL + 'words';

// Users words.
export const USER_WORDS_URL = BASE_URL + 'user-words';
export const GET_USER_WORDS_COUNT_URL = USER_WORDS_URL + '/count';