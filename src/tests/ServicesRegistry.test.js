import sinon from 'sinon';

import ServicesRegistry from '../ServicesRegistry';

describe('ServicesRegistry', () => {
    it('functionality', () => {
        const servicesRegistry = new ServicesRegistry();

        const testService = { test: sinon.spy() };

        servicesRegistry.registerService('test_service', testService);
        servicesRegistry.getService('test_service').test(123);

        expect(testService.test.calledOnce).toBe(true);
        expect(testService.test.getCall(0).args[0]).toBe(123);
    });
});
