import sinon from 'sinon';

import ServicesRegistry, { AUTH_SERVICE, LOCAL_STORAGE_SERVICE } from '../../services/ServicesRegistry';

describe('ServicesRegistry', () => {
    it('initial state', () => {
        const servicesRegistry = new ServicesRegistry();
        expect(servicesRegistry.getService(AUTH_SERVICE)).toBeDefined();
        expect(servicesRegistry.getService(LOCAL_STORAGE_SERVICE)).toBeDefined();
    });

    it('functionality', () => {
        const servicesRegistry = new ServicesRegistry();

        const testService = { test: sinon.spy() };

        servicesRegistry.registerService('test_service', testService);
        servicesRegistry.getService('test_service').test(123);

        expect(testService.test.calledOnce).toBe(true);
        expect(testService.test.getCall(0).args[0]).toBe(123);
    });
});
