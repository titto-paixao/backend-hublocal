import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

const userEntityList: UserEntity[] = [
  new UserEntity({ id: '1', name: 'User 1', email: 'user1@email.com' }),
  new UserEntity({ id: '2', name: 'User 2', email: 'user2@email.com' }),
  new UserEntity({ id: '3', name: 'User 3', email: 'user3@email.com' }),
];

describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(userEntityList),
            findOne: jest.fn().mockResolvedValue(userEntityList[0]),
            findOneOrFail: jest.fn().mockResolvedValue(userEntityList[0]),
            save: jest.fn().mockReturnValue(userEntityList[0]),
            create: jest.fn().mockResolvedValue(userEntityList[0]),
            merge: jest.fn().mockReturnValue(userEntityList[0]),
            softDelete: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return user list success', async () => {
      //Act
      const result = await userService.findAll();

      //Assert
      expect(result).toEqual(userEntityList);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exeption', () => {
      //Arrange
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error());

      //Assert
      expect(userService.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should get user success', async () => {
      //Arrange
      const params = {
        where: {
          id: '1',
        },
      };

      //Act
      const result = await userService.findOne(params);

      //Assert
      expect(result).toEqual(userEntityList[0]);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an exeption', () => {
      //Arrange
      const params = {
        where: {
          id: '1',
        },
      };

      //Arrange
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());

      //Assert
      expect(userService.findOne(params)).rejects.toThrowError();
    });
  });

  describe('findOneOrFail', () => {
    it('should get user success', async () => {
      //Arrange
      const params = {
        where: {
          id: '1',
        },
      };

      //Act
      const result = await userService.findOneOrFail(params);

      //Assert
      expect(result).toEqual(userEntityList[0]);
      expect(userRepository.findOneOrFail).toHaveBeenCalledTimes(1);
    });

    it('should throw an exeption', () => {
      //Arrange
      const params = {
        where: {
          id: '1',
        },
      };

      //Arrange
      jest
        .spyOn(userRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(userService.findOneOrFail(params)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a new user entity success', async () => {
      //Arrange
      const body: CreateUserDto = {
        name: 'user',
        email: 'user1@email.com',
        password: 'Abc@1234',
      };

      //Act
      const result = await userService.store(body);

      //Assert
      expect(result).toEqual(userEntityList[0]);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exeption', () => {
      //Arrange
      const body: CreateUserDto = {
        name: 'user',
        email: 'user1@email.com',
        password: 'Abc@1234',
      };

      //Arrange
      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error());

      //Assert
      expect(userService.store(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a user entity success', async () => {
      //Arrange
      const body: UpdateUserDto = {
        name: 'user',
      };

      //Act
      const result = await userService.update('1', body);

      //Assert
      expect(result).toEqual(userEntityList[0]);
      expect(userRepository.merge).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });

    it('should throw an exeption', () => {
      //Arrange
      const body: UpdateUserDto = {
        name: 'user',
      };

      //Arrange
      jest
        .spyOn(userRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(userService.update('1', body)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('destroy', () => {
    it('should delete a user entity success', async () => {
      //Act
      const result = await userService.destroy('1');

      //Assert
      expect(result).toBeUndefined();
      expect(userRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(userRepository.softDelete).toHaveBeenCalledTimes(1);
    });

    it('should throw a not found exeption', () => {
      //Arrange
      jest
        .spyOn(userRepository, 'findOneOrFail')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(userService.destroy('1')).rejects.toThrowError(NotFoundException);
    });
  });
});
