import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class CreateStrainTerpeneDto {
  @ApiProperty()
  @IsInt()
  terpeneId: number;

  @ApiProperty()
  @IsInt()
  strainId: number;
}
