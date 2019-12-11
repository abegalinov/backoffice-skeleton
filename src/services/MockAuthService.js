import AuthDto from '../dto/AuthDto';

export default class MockAuthService {
    constructor() {
        this.timeout = 900;    
        this.authData = AuthDto.createFromResponse({
            token: 'test_token',
            userName: 'test@test.me',
            tokenValidUntil: Date.now() + 300000,
            userRole: 'ROLE_ADMIN'
        });
    }
    login(username, password) {
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.authData);
                }, this.timeout);
            }
        )
    }
}
