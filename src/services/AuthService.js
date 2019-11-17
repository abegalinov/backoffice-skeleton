import axios from 'axios';

const ENDPOINT = `http://localhost:8080/auth`;

export default class AuthService {
    constructor(axiosMocked = null) {
        this.axios = axiosMocked || axios;
    }
    login(username, password) {
        return new Promise(
            (resolve, reject) => {
                this.axios.post(ENDPOINT, {
                    username,
                    password
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error);
                });        
            }
        )
    }
}
