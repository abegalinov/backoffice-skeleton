import AuthService from '../services/AuthService';
import AuthDto from '../core/dto/AuthDto';

describe('AuthService', () => {
    it('functionality', () => {
        const axios = {
            post: () => new Promise((resolve, reject) => {
                resolve({
                    data: {
                        token: 'test',
                        userName: 'tester',
                        tokenValidUntil: 123,
                        userRole: 'admin'                   
                    }
                });
            }) 
        };
        const authService = new AuthService(axios);

        authService.login('test', 'test123')
        .then((auth) => {
            expect(auth).toBeInstanceOf(AuthDto);
            expect(auth.token).toBe('test');
            expect(auth.userName).toBe('tester');
            expect(auth.tokenValidUntil).toBe(123);
            expect(auth.userRole).toBe('admin');
        });
    });
});
