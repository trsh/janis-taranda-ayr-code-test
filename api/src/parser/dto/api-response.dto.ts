import { ApiProperty } from '@nestjs/swagger';

export class ResBenefitDto {
  @ApiProperty()
  name: string;
}

export class ResTerpeneBenefitDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  cases: number;
}

export class ResTerpeneDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
}

export class ResStrainDetailDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  thc: number;
  @ApiProperty()
  cbd: number;
  @ApiProperty()
  terpenes: ResTerpeneDto[];
  @ApiProperty()
  benefits: ResBenefitDto[];
}

export class ResTerpeneDetailDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  benefits: ResTerpeneBenefitDto[];
}
