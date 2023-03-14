import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CompanyService } from './company.service';
import { CompanyEntity } from './entities/company.entity';

describe('CompanyService', () => {
  let companyService: CompanyService;
  let companyRepository: Repository<CompanyEntity>;
  let userRepository: Repository<UserEntity>;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        UserService,
        { provide: getRepositoryToken(CompanyEntity), useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
      ],
    }).compile();

    companyService = module.get<CompanyService>(CompanyService);
    companyRepository = module.get<Repository<CompanyEntity>>(
      getRepositoryToken(CompanyEntity),
    );
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(companyService).toBeDefined();
    expect(userService).toBeDefined();
    expect(companyRepository).toBeDefined();
    expect(userRepository).toBeDefined();
  });
});
