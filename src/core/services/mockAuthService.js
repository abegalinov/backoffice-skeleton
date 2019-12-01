import AuthDto from '../dto/AuthDto';

export default class MockAuthService {
    timeout = 900;
    login(username, password) {
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(AuthDto.createFromResponse({
                        token: 'test_token',
                        userName: 'test@test.me',
                        tokenValidUntil: Date.now() + 300000,
                        userRole: 'ROLE_ADMIN'
                    }));
                }, this.timeout);
            }
        )
    }
}
