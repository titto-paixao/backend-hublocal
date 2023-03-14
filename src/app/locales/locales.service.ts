import { CreateLocaleDto } from './dto/create-locale.dto';
import { UpdateLocaleDto } from './dto/update-locale.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { LocaleEntity } from './entities/locale.entity';
import { CompanyService } from '../company/company.service';

@Injectable()
export class LocalesService {
  constructor(
    @InjectRepository(LocaleEntity)
    private readonly localeRepository: Repository<LocaleEntity>,
    private readonly companyService: CompanyService,
  ) {}

  async create(body: CreateLocaleDto) {
    const { companyId, ...props } = body;

    const company = await this.companyService.findOneOrFail({
      where: { id: companyId },
    });

    const data = {
      ...props,
      company,
    };

    const locale = await this.localeRepository.save(
      this.localeRepository.create(data),
    );

    return locale;
  }

  async findAll(companyId: string) {
    return await this.localeRepository.find({
      where: {
        company: {
          id: companyId,
        },
      },
      relations: { company: true },
    });
  }

  async findOneOrFail(options: FindOneOptions<LocaleEntity>) {
    try {
      return await this.localeRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async update(id: string, body: UpdateLocaleDto) {
    const { companyId, ...data } = body;
    const locale = await this.findOneOrFail({
      where: { id, company: { id: companyId } },
    });
    this.localeRepository.merge(locale, data);
    return await this.localeRepository.save(locale);
  }

  async destroy(companyId: string, id: string) {
    await this.findOneOrFail({ where: { id, company: { id: companyId } } });
    this.localeRepository.softDelete({ id });
  }
}
