export default class LocalStorageService {

    storeData(key, loginData) {
        localStorage.setItem(key, JSON.stringify(loginData));
    }

    getData(key) {
        let data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }

    removeData(key) {
        localStorage.removeItem(key);
    }
}
