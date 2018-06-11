export const USER_LEVEL = {
    NOT_LOGGED_IN: 0,
    ZWS: 1,
    TUEV: 2,
    STVA: 3,
    ASTVA: 4
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

