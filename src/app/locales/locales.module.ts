import { Module } from '@nestjs/common';
import { LocalesService } from './locales.service';
import { LocalesController } from './locales.controller';
import { CompanyModule } from '../company/company.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocaleEntity } from './entities/locale.entity';

@Module({
  imports: [CompanyModule, TypeOrmModule.forFeature([LocaleEntity])],
  controllers: [LocalesController],
  providers: [LocalesService],
})
export class LocalesModule {}
