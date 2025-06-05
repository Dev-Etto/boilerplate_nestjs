import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsNumberString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateResponsibleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNumberString()
  cpf: string;

  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  companyId: number;
}
