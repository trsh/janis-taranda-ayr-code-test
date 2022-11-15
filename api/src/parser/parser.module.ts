import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Strain } from './entities/strain.entity';
import { SentencesSet } from './entities/sentences.set.entity';
import { Terpene } from './entities/terpene.entity';
import { Benefit } from './entities/benefit.entity';
import { TerpeneBenefit } from './entities/terpene.benefit.entity';
import { StrainTerpene } from './entities/strain.terpene.entity';
import { StrainBenefit } from './entities/strain.benefit.entity';
import { ParserController } from './parser.controller';
import { Parser } from './parser';
import {
  StrainsService,
  SentencesSetService,
  TerpenesService,
  ParserService,
  BenefitsService,
  StrainTerpeneService,
  TerpeneBenefitService,
  StrainBenefitService,
} from './parser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Strain,
      SentencesSet,
      Terpene,
      Benefit,
      TerpeneBenefit,
      StrainTerpene,
      StrainBenefit,
    ]),
  ],
  providers: [
    StrainsService,
    SentencesSetService,
    TerpenesService,
    ParserService,
    BenefitsService,
    StrainTerpeneService,
    TerpeneBenefitService,
    StrainBenefitService,
    Parser,
  ],
  controllers: [ParserController],
  exports: [
    StrainsService,
    SentencesSetService,
    TerpenesService,
    ParserService,
    BenefitsService,
    StrainTerpeneService,
    TerpeneBenefitService,
    StrainBenefitService,
  ],
})
export class ParserModule {}
