import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { LocalesService } from './locales.service';
import { CreateLocaleDto } from './dto/create-locale.dto';
import { UpdateLocaleDto } from './dto/update-locale.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('locales')
export class LocalesController {
  constructor(private readonly localesService: LocalesService) {}

  @Post()
  async create(@Body() createLocaleDto: CreateLocaleDto) {
    return this.localesService.create(createLocaleDto);
  }

  @Get(':companyId')
  async findAll(@Param('companyId') companyId: string) {
    return this.localesService.findAll(companyId);
  }

  @Get('/:companyId/:id')
  findOne(@Param('companyId') companyId: string, @Param('id') id: string) {
    return this.localesService.findOneOrFail({
      where: {
        id,
        company: {
          id: companyId,
        },
      },
    });
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLocaleDto: UpdateLocaleDto) {
    return this.localesService.update(id, updateLocaleDto);
  }

  @Delete('/:companyId/:id')
  remove(@Param('companyId') companyId: string, @Param('id') id: string) {
    return this.localesService.destroy(companyId, id);
  }
}
