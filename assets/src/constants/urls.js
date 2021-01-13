let ROOT_URL = "http://localhost:8000";

export const ModelUrls = {
    ITEMS: `${ROOT_URL}/api/items/`,
    USERS: `${ROOT_URL}/api/users/`,
    ADDRESSES: `${ROOT_URL}/api/addresses/`,
    COMMENTS: `${ROOT_URL}/api/comments/`,
};

let ROOT_AUTH = 'dj-rest-auth';
export const AuthUrls = {
    LOGIN: `${ROOT_URL}/${ROOT_AUTH}/login/`,
    LOGOUT: `${ROOT_URL}/${ROOT_AUTH}/logout/`,
    REGISTRATION: `${ROOT_URL}/${ROOT_AUTH}/registration/`,
};

export const AdminUrls = {
    ADMIN: `${ROOT_URL}/admin/`,
    SWAGGER: `${ROOT_URL}/swagger/`,
    SILK: `${ROOT_URL}/silk/`,
};
