export const AUTH_SERVICE = 'authService';
export const LOCAL_STORAGE_SERVICE = 'localStorageService';

export function loadService(serviceName) {
    switch (serviceName) {
        case AUTH_SERVICE:
            return process.env.NODE_ENV !== 'development'
                ? require("../services/authService")
                : require("../services/mockAuthService");    
        case LOCAL_STORAGE_SERVICE:
            return require("../services/localStorageService");
        default:
            throw new Error('Cannot load service with name: ' + serviceName);
    }
}  
