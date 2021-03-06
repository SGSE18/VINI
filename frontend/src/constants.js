export const USER_LEVEL = {
    NOT_LOGGED_IN: 0,
    ZWS: 1,
    TUEV: 2,
    STVA: 3,
    ASTVA: 4
}

export function getAuthorityInt(authorityString) {
    switch (authorityString) {
        case "Ausgeloggt": return USER_LEVEL.NOT_LOGGED_IN
        case "ZWS": return USER_LEVEL.ZWS
        case "TÜV": return USER_LEVEL.TUEV
        case "STVA": return USER_LEVEL.STVA
        case "Admin STVA": return USER_LEVEL.ASTVA
        default: return -1
    }
}
export function getAuthorityString(authorityLevel) {
    switch (authorityLevel) {
        case USER_LEVEL.NOT_LOGGED_IN: return "Ausgeloggt"
        case USER_LEVEL.ZWS: return "ZWS"
        case USER_LEVEL.TUEV: return "TÜV"
        case USER_LEVEL.STVA: return "STVA"
        case USER_LEVEL.ASTVA: return "Admin STVA"
        default: return ""
    }
}

export const TRANSACTION_VALID = "valid";
export const TRANSACTION_INVALID = "invalid";
export const TRANSACTION_PENDING = "open";
export const TRANSACTION_REJECTED = "rejected";


const HOME_PATH = "https://vini-ethereum.westeurope.cloudapp.azure.com/";
const API_PATH = HOME_PATH + "api/";
export const USER_LOGIN_PATH = API_PATH + "users/login";
export const USER_TOKEN_PATH = API_PATH + "users/token";
export const REGISTER_USER_PATH = API_PATH + "users/register";
export const DELETE_USER_PATH = REGISTER_USER_PATH;
export const RESET_PASSWORD_PATH = API_PATH + "users/resetPassword";

export const CHANGE_PREOWNER_PATH = API_PATH + "car/register";
export const GET_ANNULMENT_PATH = API_PATH + "car/cancelTransaction";
export const DECLINE_ANNULMENT_PATH = GET_ANNULMENT_PATH;
export const ACCEPT_ANNULMENT_PATH = GET_ANNULMENT_PATH;
export const SUBMIT_ANNULMENT_PATH = API_PATH + "car/applyCancelTransaction";
export const CHANGE_MILEAGE_PATH = API_PATH + "car/mileage";
export const ADD_TUEV_PATH = API_PATH + "car/tuev";
export const ADD_SERVICE_PATH = API_PATH + "car/service";
export const READ_CAR_PATH = API_PATH + "car";
export const READ_USER_PATH = API_PATH + "users";


