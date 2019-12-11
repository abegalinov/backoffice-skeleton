import sinon from 'sinon';
import StorageService from '../../services/StorageService';
describe('LocalStorageService', () => {
  const objectToStore = {
    test: 123
  };
  it('storeData functionality', () => {
    const storage = {
      setItem: sinon.spy()
    };
    const storageService = new StorageService(storage);
    storageService.storeData('test123', objectToStore);
    expect(storage.setItem.calledOnce).toBe(true);
    expect(storage.setItem.getCall(0).args[0]).toBe('test123');
    expect(storage.setItem.getCall(0).args[1]).toBe(JSON.stringify(objectToStore));
  });
  it('getData functionality', () => {
    const storage = {
      getItem: sinon.fake.returns(JSON.stringify(objectToStore))
    };
    const storageService = new StorageService(storage);
    const data = storageService.getData('test123');
    expect(storage.getItem.calledOnce).toBe(true);
    expect(storage.getItem.getCall(0).args[0]).toBe('test123');
    expect(data).toStrictEqual(objectToStore);
  });
  it('removeData functionality', () => {
    const storage = {
      removeItem: sinon.spy()
    };
    const storageService = new StorageService(storage);
    storageService.removeData('test123');
    expect(storage.removeItem.calledOnce).toBe(true);
    expect(storage.removeItem.getCall(0).args[0]).toBe('test123');
  });
});