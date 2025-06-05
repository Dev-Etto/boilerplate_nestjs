import { IsString, IsEmail, IsNumberString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResponsibleDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  cpf: string;

  @Type(() => Number)
  @IsInt()
  companyId: number;
}
