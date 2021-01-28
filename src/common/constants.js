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
    if (typeof obj !== 'undefined') requestOptions.body = JSON.stringify(obj);
    return requestOptions;
};

export const getRequestOptions = (jwt) => buildRequestOptions('GET', jwt);

export const getUserType = (role) => (typeof role === 'undefined' ? GUEST : parseInt(role, 4));

export const getLocalISOTime = () => {
    const timeZoneOffset = new Date().getTimezoneOffset() * 60000;
    return new Date(Date.now() - timeZoneOffset).toISOString().substr(0, 16);
};
