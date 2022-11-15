import { Controller, Get, Res, HttpStatus, Post, Body } from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  StrainsService,
  TerpeneBenefitService,
  StrainTerpeneService,
  StrainBenefitService,
  TerpenesService,
} from './parser.service';
import {
  ResBenefitDto,
  ResStrainDetailDto,
  ResTerpeneBenefitDto,
  ResTerpeneDetailDto,
  ResTerpeneDto,
} from './dto/api-response.dto';
import { ValidationPipe } from 'src/app.pipes';
import { CreateStrainTerpeneDto } from './dto/create-strain.terpene.dto';

/**
 * Main API controller
 */
@ApiTags('parser')
@Controller('parser')
export class ParserController {
  constructor(
    private readonly strainsService: StrainsService,
    private readonly terpeneBenefitService: TerpeneBenefitService,
    private readonly strainTerpeneService: StrainTerpeneService,
    private readonly strainBenefitService: StrainBenefitService,
    private readonly terpenesService: TerpenesService,
  ) {}

  private handleFindOne(record: unknown, res: Response) {
    if (!record) {
      res.status(HttpStatus.NOT_FOUND).json();
    } else {
      res.status(HttpStatus.OK).json(record);
    }
  }

  /**
   * Get all straints with linked data
   */
  @Get('/strains')
  @ApiResponse({
    status: 200,
    type: ResStrainDetailDto,
  })
  async strains(@Res() res: Response) {
    const responseObj: ResStrainDetailDto[] = [];

    const strainRecords = await this.strainsService.findAll();

    for (const strainRecord of strainRecords) {
      const strainTerpeneRecords =
        await this.strainTerpeneService.findAllByStrainId(strainRecord.id);

      const strainBenefitRecords =
        await this.strainBenefitService.findAllByStrainId(strainRecord.id);

      const responseTerpeneObj: ResTerpeneDto[] = strainTerpeneRecords.map(
        (rec) => ({ name: rec.terpene.name, id: rec.terpene.id }),
      );

      const responseBenefitObj: ResBenefitDto[] = strainBenefitRecords.map(
        (rec) => ({ name: rec.benefit.name }),
      );

      responseObj.push({
        name: strainRecord.name,
        terpenes: responseTerpeneObj,
        benefits: responseBenefitObj,
        thc: strainRecord.thc,
        cbd: strainRecord.cbd,
        id: strainRecord.id,
      });
    }

    if (!responseObj.length) {
      res.status(HttpStatus.NOT_FOUND).json();
    } else {
      res.status(HttpStatus.OK).json(responseObj);
    }
  }

  /**
   * Get all terpenes with linked data
   */
  @Get('/terpenes')
  @ApiResponse({
    status: 200,
    type: ResTerpeneDetailDto,
  })
  async terpenes(@Res() res: Response) {
    let respArr: ResTerpeneDetailDto[] = [];
    const respArrNoBenefits: ResTerpeneDetailDto[] = [];

    //const terpeneRecords =
    //await this.strainTerpeneService.findAllGroupByTerpene();

    const terpeneRecords = await this.terpenesService.findAll();

    for (const terpeneRecord of terpeneRecords) {
      const strainBenefitRecords =
        await this.terpeneBenefitService.findAllByTerpeneId(
          //terpeneRecord.terpeneId,
          terpeneRecord.id,
        );

      const responseBenefitObj: ResTerpeneBenefitDto[] =
        strainBenefitRecords.map((rec) => ({
          name: rec.benefit.name,
          cases: rec.cases,
        }));

      const dataToPush = {
        //id: terpeneRecord.terpene.id,
        //name: terpeneRecord.terpene.name,
        id: terpeneRecord.id,
        name: terpeneRecord.name,
        benefits: responseBenefitObj,
      };

      if (responseBenefitObj.length > 0) {
        respArr.push(dataToPush);
      } else {
        respArrNoBenefits.push(dataToPush);
      }
    }

    respArr = respArr.concat(respArrNoBenefits);

    res.status(HttpStatus.OK).json(respArr);
  }

  /**
   * Just get all terpenes
   */
  @Get('/all-terpenes')
  @ApiResponse({
    status: 200,
    type: ResTerpeneDto,
  })
  async allTerpenes(@Res() res: Response) {
    const terpeneRecords = await this.terpenesService.findAll();
    const responseObj: ResTerpeneDto[] = terpeneRecords.map((record) => ({
      id: record.id,
      name: record.name,
    }));

    if (!responseObj.length) {
      res.status(HttpStatus.NOT_FOUND).json();
    } else {
      res.status(HttpStatus.OK).json(responseObj);
    }
  }

  /**
   * Link terpene to some strain by id's
   */
  @Post('/link-terpene-to-strain')
  async linkTerpeneToStrain(
    @Body(new ValidationPipe()) linkTerpeneToStrainDto: CreateStrainTerpeneDto,
    @Res() res: Response,
  ) {
    const result = await this.strainTerpeneService.createUnique({
      strainId: linkTerpeneToStrainDto.strainId,
      terpeneId: linkTerpeneToStrainDto.terpeneId,
    });

    if (!result) {
      res.status(HttpStatus.NOT_FOUND).json();
    } else {
      res.status(HttpStatus.OK).json();
    }

    res.status(HttpStatus.OK).json();
  }
}
