import { Urls } from "../constants/urls";



export default function(state = {}, action) {
    switch(action.type) {
        case Urls.LOGIN:
            return { ...state, authenticated: true, token: action.payload};
        case Urls.LOGOUT:
            return { ...state, authenticated: false, token: action.payload};
        case Urls.REGISTRATION:
            return { ...state, authenticated: true, token: action.payload};
    }
    return state;
}