import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyEntity } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    private readonly useService: UserService,
  ) {}

  async create(userId: string, body: CreateCompanyDto) {
    const user = await this.useService.findOneOrFail({ where: { id: userId } });

    const data = {
      ...body,
      user,
    };

    const company = await this.companyRepository.save(
      this.companyRepository.create(data),
    );

    return company;
  }

  async findAll(userId: string) {
    return await this.companyRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: { user: true },
    });
  }

  async findOneOrFail(options: FindOneOptions<CompanyEntity>) {
    try {
      return await this.companyRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: string, userId: string, data: UpdateCompanyDto) {
    const company = await this.findOneOrFail({
      where: { id, user: { id: userId } },
    });
    this.companyRepository.merge(company, data);
    return await this.companyRepository.save(company);
  }

  async destroy(id: string, userId: string) {
    await this.findOneOrFail({ where: { id, user: { id: userId } } });
    this.companyRepository.softDelete({ id });
  }
}
