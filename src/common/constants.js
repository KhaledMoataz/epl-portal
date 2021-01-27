export const GUEST = 0;
export const FAN = 1;
export const MANAGER = 2;
export const ADMIN = 3;
export const BASE_URL = 'https://22bb1132efec.ngrok.io';

export const buildRequestOptions = (method, jwt, obj) => {
    const requestOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            jwt
        }
    };
    if (typeof obj !== 'undefined') requestOptions.headers.body = JSON.stringify(obj);
    return requestOptions;
};

export const getRequestOptions = (jwt) => buildRequestOptions('GET', jwt);
