import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { RegexHelper } from 'src/helpers/regex.helper';

export class CreateUserDto {
  @IsNotEmpty({
    message: MessagesHelper.NAME_REQUIRED,
  })
  name: string;

  @IsNotEmpty({
    message: MessagesHelper.EMAIL_REQUIRED,
  })
  @IsEmail(
    {},
    {
      message: MessagesHelper.EMAIL_INVALID,
    },
  )
  email: string;

  @IsNotEmpty()
  @Matches(RegexHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  @MinLength(8, {
    message: MessagesHelper.PASSWORD_MIN_LENGTH,
  })
  password: string;
}
