import axios from 'axios';

const ENDPOINT = `http://localhost:8080/auth`;

export function login(username, password) {
    return new Promise(
        (resolve, reject) => {
            axios
            .post(ENDPOINT, {
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
