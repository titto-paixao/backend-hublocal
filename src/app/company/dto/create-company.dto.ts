import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';

export class CreateCompanyDto {
  @IsNotEmpty({
    message: MessagesHelper.NAME_REQUIRED,
  })
  name: string;

  @IsNotEmpty({
    message: MessagesHelper.WEBSITE_REQUIRED,
  })
  website: string;

  @IsNotEmpty({
    message: MessagesHelper.CNPJ_REQUIRED,
  })
  @MinLength(14, {
    message: MessagesHelper.CNPJ_LENGTH,
  })
  @MaxLength(14, {
    message: MessagesHelper.CNPJ_LENGTH,
  })
  cnpj: string;
}
