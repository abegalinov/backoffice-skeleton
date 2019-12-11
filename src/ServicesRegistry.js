class ServiceRegistry {

    #services = {};

    constructor() {
        if (ServiceRegistry.instance) {
            return ServiceRegistry.instance
        }
        ServiceRegistry.instance = this;
    }
      
    registerService(key, service) {
        this.#services[key] = service;
    }

    getService(key) {
        if (!this.#services[key]) {
            throw new Error('Cannot find service');
        }
        return this.#services[key];
    }
}

export default ServiceRegistry;
