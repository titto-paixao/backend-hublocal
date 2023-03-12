import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

const userEntityList: UserEntity[] = [
  new UserEntity({ id: '1', name: 'User 1', email: 'user1@email.com' }),
  new UserEntity({ id: '2', name: 'User 2', email: 'user2@email.com' }),
  new UserEntity({ id: '3', name: 'User 3', email: 'user3@email.com' }),
];

const newUserEntity = new UserEntity({
  name: 'User',
  email: 'user@email.com',
  password: 'Abc@1234',
});

const updateUserEntity = new UserEntity({
  name: 'User',
  email: 'user@email.com',
});

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(userEntityList),
            store: jest.fn().mockResolvedValue(newUserEntity),
            findOneOrFail: jest.fn().mockResolvedValue(userEntityList[0]),
            update: jest.fn().mockResolvedValue(updateUserEntity),
            destroy: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('index', () => {
    it('should return user list success', async () => {
      //Act
      const result = await userController.index();

      //Assert
      expect(result).toEqual(userEntityList);
      expect(typeof result).toEqual('object');
    });

    it('should throw an exeption', async () => {
      //Arrange
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());

      //Assert
      expect(userController.index()).rejects.toThrowError();
    });
  });

  describe('show', () => {
    it('should get a user success', async () => {
      //Arrange
      const params = {
        where: { id: '1' },
      };

      //Act
      const result = await userController.show('1');

      //Assert
      expect(result).toEqual(userEntityList[0]);
      expect(userService.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(userService.findOneOrFail).toHaveBeenCalledWith(params);
    });

    it('should throw an exeption', async () => {
      //Arrange
      jest
        .spyOn(userService, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(userController.show('1')).rejects.toThrowError();
    });
  });

  describe('store', () => {
    it('should create a new user success', async () => {
      //Arrange
      const body: CreateUserDto = {
        name: 'user',
        email: 'user@email.com',
        password: 'Abc@1234',
      };
      //Act
      const result = await userController.store(body);

      //Assert
      expect(result).toEqual(newUserEntity);
      expect(userService.store).toHaveBeenCalledTimes(1);
      expect(userService.store).toHaveBeenCalledWith(body);
    });

    it('should throw an exeption', () => {
      //Arrange
      const body: CreateUserDto = {
        name: 'user',
        email: 'user@email.com',
        password: 'Abc@1234',
      };
      //Arrange
      jest.spyOn(userService, 'store').mockRejectedValueOnce(new Error());

      //Assert
      expect(userController.store(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a user success', async () => {
      //Arrange
      const body: UpdateUserDto = {
        name: 'user',
        email: 'user@email.com',
      };
      //Act
      const result = await userController.update('1', body);

      //Assert
      expect(result).toEqual(updateUserEntity);
      expect(userService.update).toHaveBeenCalledTimes(1);
      expect(userService.update).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exeption', () => {
      //Arrange
      const body: UpdateUserDto = {
        name: 'user',
        email: 'user@email.com',
      };
      //Arrange
      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());

      //Assert
      expect(userController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('destroy', () => {
    it('should remove a user success', async () => {
      //Act
      const result = await userController.destroy('1');

      //Assert
      expect(result).toBeUndefined();
    });

    it('should throw an exeption', () => {
      //Arrange
      jest.spyOn(userService, 'destroy').mockRejectedValueOnce(new Error());

      //Assert
      expect(userController.destroy('1')).rejects.toThrowError();
    });
  });
});
