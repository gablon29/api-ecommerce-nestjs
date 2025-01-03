import {
  IsAlpha,
  IsEmail,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class UserDto {
  @Length(3, 10)
  @IsAlpha()
  name: string;
  @IsAlpha()
  @Length(3, 10)
  lastName: string;
  @Length(3, 10)
  username: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  @Length(8, 20)
  password: string;
  @IsPhoneNumber()
  phone: string;
}
