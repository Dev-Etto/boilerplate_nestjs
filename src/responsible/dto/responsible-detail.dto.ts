import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsEmail } from 'class-validator';

export class ResponsibleDetailDto {
  @ApiProperty()
  @IsInt()
  id: number;

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
  @IsString()
  cpf: string;

  @ApiProperty()
  @IsInt()
  companyId: number;
}
