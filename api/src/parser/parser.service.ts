import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateStrainDto } from './dto/create-strain.dto';
import { CreateTerpeneDto } from './dto/create-terpene.dto';
import { CreateBenefitDto } from './dto/create-benefit.dto';
import { CreateStrainTerpeneDto } from './dto/create-strain.terpene.dto';
import { CreateTerpeneBenefitDto } from './dto/create-terpene.benefit.dto';
import { CreateStrainBenefitDto } from './dto/create-strain.benefit.dto';
import { Strain } from './entities/strain.entity';
import { Terpene } from './entities/terpene.entity';
import { Benefit } from './entities/benefit.entity';
import { SentencesSet } from './entities/sentences.set.entity';
import { StrainTerpene } from './entities/strain.terpene.entity';
import { TerpeneBenefit } from './entities/terpene.benefit.entity';
import { StrainBenefit } from './entities/strain.benefit.entity';
import { Parser, TerpeneData } from './parser';

interface CreateUniqueResult<T> {
  record: T;
  created: boolean;
}

// Note: ideally I would split these services in multiple files and maybe even modules

/**
 * The service to operate with data of strains
 */
@Injectable()
export class StrainsService {
  constructor(
    @InjectRepository(Strain)
    private readonly strainsRepository: Repository<Strain>,
  ) {}

  create(createStrainDto: CreateStrainDto): Promise<Strain> {
    const strain = new Strain();
    strain.name = createStrainDto.name;
    return this.strainsRepository.save(strain);
  }

  async createUnique(
    createStrainDto: CreateStrainDto,
  ): Promise<CreateUniqueResult<Strain>> {
    const exRecord = await this.strainsRepository.findOneBy({
      name: createStrainDto.name,
    });

    if (!exRecord) {
      const strain = new Strain();
      strain.name = createStrainDto.name;
      strain.thc = createStrainDto.thc;
      strain.cbd = createStrainDto.cbd;
      const newRecord = await this.strainsRepository.save(strain);

      return {
        record: newRecord,
        created: true,
      };
    }

    return {
      record: exRecord,
      created: false,
    };
  }

  async findAll(): Promise<Strain[]> {
    return this.strainsRepository.find();
  }

  async findAllJoinTerpenes(): Promise<Strain[]> {
    return this.strainsRepository.find({
      relations: {
        strainTerpene: true,
      },
    });
  }

  findOne(id: number): Promise<Strain> {
    return this.strainsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.strainsRepository.delete(id);
  }
}

/**
 * The service to operate with data of terpenes
 */
@Injectable()
export class TerpenesService {
  constructor(
    @InjectRepository(Terpene)
    private readonly terpenesRepository: Repository<Terpene>,
  ) {}

  create(createTerpeneDto: CreateTerpeneDto): Promise<Terpene> {
    const terpene = new Terpene();
    terpene.name = createTerpeneDto.name;
    return this.terpenesRepository.save(terpene);
  }

  async createUnique(createTerpeneDto: CreateTerpeneDto): Promise<Terpene> {
    const exRecord = await this.terpenesRepository.findOneBy({
      name: createTerpeneDto.name,
    });

    if (!exRecord) {
      return this.create(createTerpeneDto);
    }

    return exRecord;
  }

  async findAll(): Promise<Terpene[]> {
    return this.terpenesRepository.find({
      order: {
        name: 'ASC',
      },
    });
  }

  findOne(id: number): Promise<Terpene> {
    return this.terpenesRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.terpenesRepository.delete(id);
  }
}

/**
 * The service to operate with data of benefits
 */
@Injectable()
export class BenefitsService {
  constructor(
    @InjectRepository(Benefit)
    private readonly benefitsRepository: Repository<Benefit>,
  ) {}

  create(createBenefitDto: CreateBenefitDto): Promise<Benefit> {
    const benefit = new Benefit();
    benefit.name = createBenefitDto.name;
    return this.benefitsRepository.save(benefit);
  }

  async createUnique(createBenefitDto: CreateBenefitDto): Promise<Benefit> {
    const exRecord = await this.benefitsRepository.findOneBy({
      name: createBenefitDto.name,
    });

    if (!exRecord) {
      return this.create(createBenefitDto);
    }

    return exRecord;
  }

  async findAll(): Promise<Benefit[]> {
    return this.benefitsRepository.find();
  }

  findOne(id: number): Promise<Benefit> {
    return this.benefitsRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.benefitsRepository.delete(id);
  }
}

/**
 * The service to operate with data of strain and terpene connection
 */
@Injectable()
export class StrainTerpeneService {
  constructor(
    @InjectRepository(StrainTerpene)
    private readonly strainTerpeneRepository: Repository<StrainTerpene>,
  ) {}

  create(
    createStrainTerpeneDto: CreateStrainTerpeneDto,
  ): Promise<StrainTerpene> {
    const strainTerpene = new StrainTerpene();
    strainTerpene.strainId = createStrainTerpeneDto.strainId;
    strainTerpene.terpeneId = createStrainTerpeneDto.terpeneId;
    return this.strainTerpeneRepository.save(strainTerpene);
  }

  async createUnique(
    createStrainTerpeneDto: CreateStrainTerpeneDto,
  ): Promise<StrainTerpene> {
    const exRecord = await this.strainTerpeneRepository.findOneBy({
      strainId: createStrainTerpeneDto.strainId,
      terpeneId: createStrainTerpeneDto.terpeneId,
    });

    if (!exRecord) {
      return this.create(createStrainTerpeneDto);
    }

    return exRecord;
  }

  async findAll(): Promise<StrainTerpene[]> {
    return this.strainTerpeneRepository.find();
  }

  async findAllGroupByTerpene(): Promise<StrainTerpene[]> {
    return (
      this.strainTerpeneRepository
        .createQueryBuilder('strain_terpene')
        .leftJoinAndSelect('strain_terpene.terpene', 'terpene')
        .groupBy('strain_terpene.terpeneId')
        //.orderBy('terpene.name')
        .getMany()
    );
  }

  async findAllByStrainId(strainId: number): Promise<StrainTerpene[]> {
    return this.strainTerpeneRepository.find({
      relations: {
        terpene: true,
      },
      where: {
        strainId,
      },
    });
  }

  async findAllByTerpeneId(terpeneId: number): Promise<StrainTerpene[]> {
    return this.strainTerpeneRepository.find({
      relations: {
        strain: true,
      },
      where: {
        terpeneId,
      },
    });
  }

  findOne(id: number): Promise<StrainTerpene> {
    return this.strainTerpeneRepository.findOneBy({ id: id });
  }
}

/**
 * The service to operate with data of strain and benefit connection
 */
@Injectable()
export class StrainBenefitService {
  constructor(
    @InjectRepository(StrainBenefit)
    private readonly strainBenefitRepository: Repository<StrainBenefit>,
  ) {}

  create(
    createStrainBenefitDto: CreateStrainBenefitDto,
  ): Promise<StrainBenefit> {
    const strainBenefit = new StrainBenefit();
    strainBenefit.benefitId = createStrainBenefitDto.benefitId;
    strainBenefit.strainId = createStrainBenefitDto.strainId;
    return this.strainBenefitRepository.save(strainBenefit);
  }

  async createUnique(
    createStrainBenefitDto: CreateStrainBenefitDto,
  ): Promise<StrainBenefit> {
    const exRecord = await this.strainBenefitRepository.findOneBy({
      benefitId: createStrainBenefitDto.benefitId,
      strainId: createStrainBenefitDto.strainId,
    });

    if (!exRecord) {
      return this.create(createStrainBenefitDto);
    }

    return exRecord;
  }

  async findAllByStrainId(strainId: number): Promise<StrainBenefit[]> {
    return this.strainBenefitRepository.find({
      relations: {
        benefit: true,
      },
      where: {
        strainId,
      },
    });
  }

  async findAll(): Promise<StrainBenefit[]> {
    return this.strainBenefitRepository.find();
  }

  findOne(id: number): Promise<StrainBenefit> {
    return this.strainBenefitRepository.findOneBy({ id: id });
  }
}

/**
 * The service to operate with data of terpene and benefit connection
 */
@Injectable()
export class TerpeneBenefitService {
  constructor(
    @InjectRepository(TerpeneBenefit)
    private readonly terpeneBenefitRepository: Repository<TerpeneBenefit>,
  ) {}

  create(
    createTerpeneBenefitDto: CreateTerpeneBenefitDto,
  ): Promise<TerpeneBenefit> {
    const terpeneBenefit = new TerpeneBenefit();
    terpeneBenefit.benefitId = createTerpeneBenefitDto.benefitId;
    terpeneBenefit.terpeneId = createTerpeneBenefitDto.terpeneId;
    terpeneBenefit.cases = 1;
    return this.terpeneBenefitRepository.save(terpeneBenefit);
  }

  async createUnique(
    createTerpeneBenefitDto: CreateTerpeneBenefitDto,
    newCase: boolean,
  ): Promise<TerpeneBenefit> {
    const exRecord = await this.terpeneBenefitRepository.findOneBy({
      benefitId: createTerpeneBenefitDto.benefitId,
      terpeneId: createTerpeneBenefitDto.terpeneId,
    });

    if (!exRecord) {
      return this.create(createTerpeneBenefitDto);
    } else if (newCase) {
      // NOTE: we can afford this without transaction and increment, becase is not a case of overlapping
      return await this.terpeneBenefitRepository.save({
        id: exRecord.id,
        cases: exRecord.cases + 1,
      });
    }

    return exRecord;
  }

  async findAll(): Promise<TerpeneBenefit[]> {
    return this.terpeneBenefitRepository.find();
  }

  async findAllByTerpeneId(terpeneId: number): Promise<TerpeneBenefit[]> {
    return this.terpeneBenefitRepository.find({
      relations: { benefit: true },
      where: { terpeneId },
    });
  }

  findOne(id: number): Promise<TerpeneBenefit> {
    return this.terpeneBenefitRepository.findOneBy({ id: id });
  }
}

/**
 * The service to operate with data of setneces that came from injest
 */
@Injectable()
export class SentencesSetService {
  constructor(
    @InjectRepository(SentencesSet)
    private readonly sentencesSetRepository: Repository<SentencesSet>,
  ) {}

  public findAll(): Promise<SentencesSet[]> {
    return this.sentencesSetRepository.find();
  }
}

/**
 * The service that parses the injest and creates data structure from it
 */
@Injectable()
export class ParserService {
  constructor(
    private readonly strainsService: StrainsService,
    private readonly benefitsService: BenefitsService,
    private readonly sentencesSetService: SentencesSetService,
    private readonly terpenesService: TerpenesService,
    private readonly strainTerpeneService: StrainTerpeneService,
    private readonly terpeneBenefitService: TerpeneBenefitService,
    private readonly strainBenefitService: StrainBenefitService,
    private readonly parser: Parser,
  ) {}

  async syncSentencesSets() {
    const setnecesSets = await this.sentencesSetService.findAll();

    if (setnecesSets.length) {
      const terpenes = await this.terpenesService.findAll();

      if (terpenes.length) {
        let terpenesData: TerpeneData[] = [];
        terpenesData = terpenes.map((record) => ({
          name: record.name,
          id: record.id,
        }));

        for (const setnecesSet of setnecesSets) {
          const extractedFeatures = this.parser.getFeatures(
            setnecesSet.text,
            terpenesData,
          );

          const strainCreateResult = await this.strainsService.createUnique({
            name: extractedFeatures.strainName,
            thc: extractedFeatures.clocksProps.thc,
            cbd: extractedFeatures.clocksProps.cbd,
          });

          if (!strainCreateResult.record) {
            throw Error(
              `Was unable tp store/retrieve strain: "${extractedFeatures.strainName}"`,
            );
          }

          const benefitRecordsIds: number[] = [];

          for (const benefitPhrase of extractedFeatures.benefitsList) {
            const benefitRecord = await this.benefitsService.createUnique({
              name: benefitPhrase,
            });

            if (!benefitRecord) {
              throw Error(
                `Was unable tp store/retrieve benefit: "${benefitPhrase}"`,
              );
            }

            const strainBenefitData = {
              benefitId: benefitRecord.id,
              strainId: strainCreateResult.record.id,
            };

            const strainBenefitRecord =
              await this.strainBenefitService.createUnique(strainBenefitData);

            if (!strainBenefitRecord) {
              throw Error(
                `Was unable tp store/retrieve strain-benefit relation: "${JSON.stringify(
                  strainBenefitData,
                )}"`,
              );
            }

            benefitRecordsIds.push(benefitRecord.id);
          }

          for (const terpeneData of extractedFeatures.terpenesData) {
            const strainTerpeneData = {
              strainId: strainCreateResult.record.id,
              terpeneId: terpeneData.id,
            };

            const strainTerpeneRecord =
              await this.strainTerpeneService.createUnique(strainTerpeneData);

            if (!strainTerpeneRecord) {
              throw Error(
                `Was unable tp store/retrieve strain-terpene relation: "${JSON.stringify(
                  strainTerpeneData,
                )}"`,
              );
            }

            for (const benefitRecordsId of benefitRecordsIds) {
              const terpeneBenefitData = {
                benefitId: benefitRecordsId,
                terpeneId: terpeneData.id,
              };

              const terpeneBenefitRecord =
                await this.terpeneBenefitService.createUnique(
                  terpeneBenefitData,
                  strainCreateResult.created,
                );

              if (!terpeneBenefitRecord) {
                throw Error(
                  `Was unable tp store/retrieve terpene=benefit relation: "${JSON.stringify(
                    terpeneBenefitData,
                  )}"`,
                );
              }
            }
          }
        }
      } else {
        throw Error(`No terpenes to process in database`);
      }
    } else {
      throw Error(`No sentences to process in database`);
    }
  }
}
