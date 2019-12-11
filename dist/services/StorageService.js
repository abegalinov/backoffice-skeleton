export default class StorageService {
  constructor(storage = localStorage) {
    this.storage = storage;
  }

  storeData(key, loginData) {
    this.storage.setItem(key, JSON.stringify(loginData));
  }

  getData(key) {
    let data = this.storage.getItem(key);
    return data ? JSON.parse(data) : null;
  }

  removeData(key) {
    this.storage.removeItem(key);
  }

}