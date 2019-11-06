const LOCAL_STORAGE_LOGIN_DATA_KEY = 'loggedIn';

export const storeLoginData = (loginData) => {
    localStorage.setItem(LOCAL_STORAGE_LOGIN_DATA_KEY, JSON.stringify(loginData));
}

export const getLoginData = () => {
    let data = localStorage.getItem(LOCAL_STORAGE_LOGIN_DATA_KEY);
    return data ? JSON.parse(data) : null;
}

export const removeLoginData = () => {
    localStorage.removeItem(LOCAL_STORAGE_LOGIN_DATA_KEY);
}
