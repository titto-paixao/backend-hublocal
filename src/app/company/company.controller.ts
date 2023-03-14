import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  async create(@Body() body: CreateCompanyDto, @Req() req) {
    return this.companyService.create(req.user.id, body);
  }

  @Get()
  async findAll(@Req() req) {
    return this.companyService.findAll(req.user.id);
  }

  @Get(':id')
  async show(@Param('id', new ParseUUIDPipe()) id: string, @Req() req) {
    return this.companyService.findOneOrFail({
      where: { id, user: { id: req.user.id } },
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() req,
  ) {
    return this.companyService.update(id, req.user.id, updateCompanyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req) {
    return this.companyService.destroy(id, req.user.id);
  }
}
