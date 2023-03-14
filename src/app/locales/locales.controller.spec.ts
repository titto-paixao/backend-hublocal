import { Test, TestingModule } from '@nestjs/testing';
import { LocalesController } from './locales.controller';
import { LocalesService } from './locales.service';

describe('LocalesController', () => {
  let localesController: LocalesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalesController],
      providers: [{ provide: LocalesService, useValue: {} }],
    }).compile();

    localesController = module.get<LocalesController>(LocalesController);
  });

  it('should be defined', () => {
    expect(localesController).toBeDefined();
  });
});
