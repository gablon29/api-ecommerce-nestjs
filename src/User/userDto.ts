import { IsAlpha, IsStrongPassword, Length } from 'class-validator';

export class UserDto {
  @Length(3, 10)
  @IsAlpha()
  name: string;

  @Length(3, 10, {
    message: 'El nombre de usuario debe tener entre 3 y 10 caracteres',
  })
  username: string;
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
