import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNumberString,
  IsInt,
  IsOptional,
} from 'class-validator';
import { CreateResponsibleDto } from './create-responsible.dto';

export class UpdateResponsibleDto extends PartialType(CreateResponsibleDto) {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  cpf?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  companyId?: number;
}
