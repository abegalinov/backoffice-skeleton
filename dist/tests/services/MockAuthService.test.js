import MockAuthService from '../../services/MockAuthService';
import AuthDto from '../../dto/AuthDto';
describe('MockAuthService', () => {
  it('functionality', () => {
    const mockAuthService = new MockAuthService();
    mockAuthService.timeout = 1;
    mockAuthService.login('test', 'test123').then(auth => {
      expect(auth).toBeInstanceOf(AuthDto);
    });
  });
});