import axios from 'axios';

import AuthDto from '../core/dto/AuthDto';

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
                    resolve(AuthDto.createFromResponse(response.data));
                })
                .catch(error => {
                    reject(error);
                });        
            }
        )
    }
}
