import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanyService } from '../company/company.service';
import { CompanyEntity } from '../company/entities/company.entity';
import { UserEntity } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { LocaleEntity } from './entities/locale.entity';
import { LocalesService } from './locales.service';

describe('LocalesService', () => {
  let localesService: LocalesService;
  let localesRepository: Repository<LocaleEntity>;

  let companyService: CompanyService;
  let companyRepository: Repository<CompanyEntity>;

  let userService: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalesService,
        CompanyService,
        UserService,
        { provide: getRepositoryToken(LocaleEntity), useValue: {} },
        { provide: getRepositoryToken(CompanyEntity), useValue: {} },
        { provide: getRepositoryToken(UserEntity), useValue: {} },
      ],
    }).compile();

    localesService = module.get<LocalesService>(LocalesService);
    localesRepository = module.get<Repository<LocaleEntity>>(
      getRepositoryToken(LocaleEntity),
    );

    companyService = module.get<CompanyService>(CompanyService);
    companyRepository = module.get<Repository<CompanyEntity>>(
      getRepositoryToken(CompanyEntity),
    );

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should be defined', () => {
    expect(localesService).toBeDefined();
    expect(localesRepository).toBeDefined();

    expect(companyService).toBeDefined();
    expect(companyRepository).toBeDefined();

    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });
});
