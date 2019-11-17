import MockAuthService from './MockAuthService';
import LocalStorageService from './LocalStorageService';

export const AUTH_SERVICE = 'authService';
export const LOCAL_STORAGE_SERVICE = 'localStorageService';

class ServiceRegistry {

    services = {};

    constructor() {
        if (ServiceRegistry.instance) {
            return ServiceRegistry.instance
        }
        this.registerDefaultServices();
        ServiceRegistry.instance = this;
    }
    
    registerDefaultServices() {
        this.registerService(AUTH_SERVICE, new MockAuthService());
        this.registerService(LOCAL_STORAGE_SERVICE, new LocalStorageService());
    }
  
    registerService(key, service) {
        this.services[key] = service;
    }

    getService(key) {
        if (!this.services[key]) {
            throw new Error('Cannot find service');
        }
        return this.services[key];
    }
}

export default ServiceRegistry;
