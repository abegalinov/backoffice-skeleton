import axios from 'axios';

const ENDPOINT = `http://localhost:8080/auth`;

class authService {
    static login(username, password, successCb, errorCb) {
        axios
        .post(ENDPOINT, {
          username,
          password
        })
        .then(res => {
            successCb(res.data);
        })
        .catch(err => {
            errorCb(err);
        });
    }
}

export default authService;