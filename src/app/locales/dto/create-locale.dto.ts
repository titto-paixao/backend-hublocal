import { IsNotEmpty } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';

export class CreateLocaleDto {
  @IsNotEmpty({
    message: MessagesHelper.NAME_REQUIRED,
  })
  name: string;

  @IsNotEmpty({
    message: MessagesHelper.CEP_REQUIRED,
  })
  cep: string;

  @IsNotEmpty({
    message: MessagesHelper.ADDRESS_REQUIRED,
  })
  address: string;

  @IsNotEmpty({
    message: MessagesHelper.NEIGHBORHOOD_REQUIRED,
  })
  neighborhood: string;

  @IsNotEmpty({
    message: MessagesHelper.CITY_REQUIRED,
  })
  city: string;

  @IsNotEmpty({
    message: MessagesHelper.STATE_REQUIRED,
  })
  state: string;

  @IsNotEmpty({
    message: MessagesHelper.COMPANY_REQUIRED,
  })
  companyId: string;
}
