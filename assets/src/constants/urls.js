let ROOT_URL = "http://localhost:8000";

export const ModelUrls = {
    ITEMS: `${ROOT_URL}/api/items/`,
    USERS: `${ROOT_URL}/api/users/`,
    ADDRESSES: `${ROOT_URL}/api/addresses/`,
    COMMENTS: `${ROOT_URL}/api/comments/`,
};

export const AuthUrls = {
    LOGIN: `${ROOT_URL}/login/`,
    LOGOUT: `${ROOT_URL}/dj-rest-auth/logout/`,
    REGISTRATION: `${ROOT_URL}/dj-rest-auth/registration/`,
};
