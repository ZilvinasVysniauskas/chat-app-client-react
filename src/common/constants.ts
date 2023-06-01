export const LocalStorageKeys = {
    TOKEN: 'token',
    EXPIRES_AT: 'expires_at',
    USER_ID: 'user_id'
};

export const HeaderNames = {
    AUTHORIZATION: 'Authorization'
};

[LocalStorageKeys, HeaderNames].forEach((obj) => { Object.freeze(obj); });