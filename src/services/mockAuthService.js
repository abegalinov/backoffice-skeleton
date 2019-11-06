export function login(username, password) {
    return new Promise(
        (resolve, reject) => {
            setTimeout(() => {
                resolve({
                    token: 'test_token',
                    userName: 'test@test.me',
                    tokenValidUntil: Date.now() + 300000,
                    userRole: 'ROLE_ADMIN'
                });
            }, 900);
        }
    )
}
