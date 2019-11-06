export const AUTH_SERVICE = 'authService';

export function loadService(serviceName) {
    switch (serviceName) {
        case AUTH_SERVICE:
            return process.env.NODE_ENV !== 'development'
                ? require("../services/authService")
                : require("../services/mockAuthService");    
            break;
        default:
            throw 'Cannot load service';
            break;
    }
}  
