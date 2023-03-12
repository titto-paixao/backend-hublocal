import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const returnLogin = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  user: {
    id: '1',
    name: 'User',
    email: 'user@mail.com',
  },
};

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockReturnValue(returnLogin),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should login success', async () => {
      //Arrange
      const body = {
        email: 'user@mail.com',
        password: 'Abc@1234',
      };

      //Act
      const result = await authController.login(body);

      //Assert
      expect(result).toEqual(returnLogin);
    });

    it('should throw an exeption', async () => {
      //Arrange
      const body = {
        email: 'user@mail.com',
        password: 'Abc@1234',
      };

      //Arrange
      jest.spyOn(authService, 'login').mockRejectedValueOnce(new Error());

      //Assert
      expect(authController.login(body)).rejects.toThrowError();
    });
  });
});
