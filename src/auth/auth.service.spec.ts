import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from 'src/app/user/user.entity';
import { AuthService } from './auth.service';

const returnLogin = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  user: {
    id: '1',
    name: 'User',
    email: 'user@mail.com',
  },
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockReturnValue(returnLogin),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should login success', async () => {
      //Arrange
      const user = new UserEntity({
        id: '1',
        email: 'user1@email.com',
      });

      //Act
      const result = await authService.login(user);

      //Assert
      expect(result).toEqual(returnLogin);
    });

    it('should throw an exeption', () => {
      //Arrange
      const user = new UserEntity({
        id: '1',
        email: 'user1@email.com',
      });

      //Arrange
      jest.spyOn(authService, 'login').mockRejectedValueOnce(new Error());

      //Assert
      expect(authService.login(user)).rejects.toThrowError();
    });
  });
});
