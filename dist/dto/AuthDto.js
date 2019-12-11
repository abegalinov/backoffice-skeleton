export default class AuthDto {
  constructor() {
    this.token = null;
    this.userName = null;
    this.tokenValidUntil = 0;
    this.userRole = 'ROLE_USER';
  }

  static createFromResponse(response) {
    let dto = new AuthDto();
    dto.token = response.token;
    dto.userName = response.userName;
    dto.tokenValidUntil = response.tokenValidUntil;
    dto.userRole = response.userRole;
    return dto;
  }

}