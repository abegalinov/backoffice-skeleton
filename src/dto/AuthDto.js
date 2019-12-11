export default class AuthDto {
    token;
    userName;
    tokenValidUntil;
    userRole;

    static createFromResponse(response) {
        let dto = new AuthDto();
        dto.token = response.token;
        dto.userName = response.userName;
        dto.tokenValidUntil = response.tokenValidUntil;
        dto.userRole = response.userRole;

        return dto;
    }
}
