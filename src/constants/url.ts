const BASE_URL = 'http://localhost:3146/api/'


export const SIGN_IN_URL = BASE_URL + 'auth/login';
export const SIGN_UP_URL = BASE_URL + 'auth/register';
export const LOGOUT_URL = BASE_URL + 'auth/logout';
export const AUTH_ME_URL = BASE_URL + 'auth/me';
export const GET_ITEMS_URL = 'http://localhost:3001/api/v1/medication/?sort=DESC&order=change_date';
export const POST_ITEM_URL = 'http://localhost:3001/api/v1/medication';
export const PATCH_ITEM_URL = 'http://localhost:3001/api/v1/medication/';