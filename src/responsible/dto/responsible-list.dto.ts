import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsEmail } from 'class-validator';

export class ResponsibleListDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
