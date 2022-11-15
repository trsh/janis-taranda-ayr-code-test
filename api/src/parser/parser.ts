import { Injectable } from '@nestjs/common';
import { WinkMethods } from 'wink-nlp';
import * as winkNLP from 'wink-nlp';
import * as winkModel from 'wink-eng-lite-model';
import * as winkDistance from 'wink-distance';

export interface TerpeneData {
  id: number;
  name: string;
}

export interface ClocksPropsFeatures {
  thc: number;
  cbd: number;
}

export interface ParsedFeatures {
  strainName: string;
  terpenesData: TerpeneData[];
  benefitsList: string[];
  clocksProps: ClocksPropsFeatures;
}

export interface ParserConfig {
  strainNameRegex: RegExp;
  terpenesSentenceNum: number;
  terpenesRegex: RegExp;
  terpeneNameErrorTolerance: number;
  benefitsSentenceNum: number;
  benefitsRegex: RegExp;
  splitFeaturesRegex: RegExp;
  clocksPropsSentenceNum: number;
  clocksPropsRegex: RegExp;
}

/**
 * Logic that parses the Injest
 */
@Injectable()
export class Parser {
  private readonly nlp: WinkMethods;
  private config: ParserConfig;

  constructor() {
    this.nlp = (<any>winkNLP)(winkModel); // TODO: Some hack to get things working, review layer
  }

  public getStrainNameFromText(text: string): string | null {
    const rgxResult = this.config.strainNameRegex.exec(text);

    if (rgxResult == null) {
      return null;
    }

    return rgxResult[1];
  }

  private setStrainNameFromText(
    text: string,
    context: ParsedFeatures,
  ): boolean {
    const strainName = this.getStrainNameFromText(text);

    if (strainName == null) {
      return false;
    }

    context.strainName = strainName;
    return true;
  }

  public getTerpenesFromText(
    text: string,
    terpenesData: TerpeneData[],
  ): TerpeneData[] {
    const resTerpenesData: TerpeneData[] = [];

    const textDoc = this.nlp.readDoc(text);
    const terpenesSentenceObj = textDoc
      .sentences()
      .itemAt(this.config.terpenesSentenceNum);

    if (terpenesSentenceObj !== undefined) {
      const terpenesSentenceText = terpenesSentenceObj.out();
      const terpenesRgx = this.config.terpenesRegex;
      const terpenesRgxResult = terpenesRgx.exec(terpenesSentenceText);

      if (terpenesRgxResult != null) {
        const terpenesSentenceDoc = this.nlp.readDoc(terpenesRgxResult[1]);
        const terpenesSentenceTokens = terpenesSentenceDoc
          .tokens()
          .filter(
            (t) =>
              t.out<string>(this.nlp.its.type) === 'word' &&
              !(t.out(this.nlp.its.stopWordFlag) as boolean),
          )
          .out(this.nlp.its.lemma);

        for (const terpenesSentenceToken of terpenesSentenceTokens) {
          for (const terpeneData of terpenesData) {
            // NOTE: jaro might work better, then levenshtein? And many other improvemets.
            const distance = winkDistance.string.levenshtein(
              terpenesSentenceToken,
              terpeneData.name,
            );

            if (distance <= this.config.terpeneNameErrorTolerance) {
              resTerpenesData.push(terpeneData);
            }
          }
        }
      }
    }

    return resTerpenesData;
  }

  private setTerpenesFromText(
    text: string,
    terpenesData: TerpeneData[],
    context: ParsedFeatures,
  ): boolean {
    context.terpenesData = this.getTerpenesFromText(text, terpenesData);
    return context.terpenesData.length > 0;
  }

  public getBenefitsFromText(text: string): string[] {
    let benefitsList: string[] = [];
    const textDoc = this.nlp.readDoc(text);
    const benefitsSentenceObj = textDoc
      .sentences()
      .itemAt(this.config.benefitsSentenceNum);

    if (benefitsSentenceObj != null) {
      const benefitsSentenceText = benefitsSentenceObj.out();
      const benefitsRgx = this.config.benefitsRegex;
      const benefitsRgxResult = benefitsRgx.exec(benefitsSentenceText);

      if (benefitsRgxResult != null) {
        const benefitNamesArr = benefitsRgxResult[1]
          .split(this.config.splitFeaturesRegex)
          .map((s) => s.trim().replace(/[^\w\s]/gi, ''));
        benefitsList = benefitNamesArr;
      }
    }

    return benefitsList;
  }

  private setBenefitsFromText(text: string, context: ParsedFeatures): boolean {
    context.benefitsList = this.getBenefitsFromText(text);
    return context.benefitsList.length > 0;
  }

  public getClocksPropsFromText(text: string): ClocksPropsFeatures | undefined {
    const textDoc = this.nlp.readDoc(text);
    const clocksPropsSentenceObj = textDoc
      .sentences()
      .itemAt(this.config.clocksPropsSentenceNum);

    if (clocksPropsSentenceObj) {
      const clocksPropsSentenceText = clocksPropsSentenceObj.out();
      const rgxResult = this.config.clocksPropsRegex.exec(
        clocksPropsSentenceText,
      );

      if (rgxResult) {
        return {
          thc: +rgxResult[1],
          cbd: +rgxResult[2],
        };
      }
    }

    return undefined;
  }

  private setClocksPropsFromText(
    text: string,
    context: ParsedFeatures,
  ): boolean {
    const clocksProps = this.getClocksPropsFromText(text);
    if (!clocksProps) {
      return false;
    }
    context.clocksProps = clocksProps;
    return true;
  }

  // Note: this could come from enviroment variables
  private getDefaultConfig(): ParserConfig {
    return {
      terpeneNameErrorTolerance: 2,
      benefitsSentenceNum: 1,
      benefitsRegex: /\shelps with\s(.*)\./gi,
      strainNameRegex: /this (.*) is a product/gi,
      splitFeaturesRegex: /,\s+and|,|and/gi,
      terpenesSentenceNum: 2,
      clocksPropsSentenceNum: 3,
      clocksPropsRegex: /(\d+)% THC and (\d+)% CBD/gi,
      terpenesRegex: /packed with terpenes such as\s(.*)\./gi,
    };
  }

  public getFeatures(
    text: string,
    terpenesData: TerpeneData[],
    config?: ParserConfig,
  ): ParsedFeatures {
    this.config = { ...this.getDefaultConfig(), ...config };

    const context: ParsedFeatures = {
      strainName: undefined,
      terpenesData: [],
      benefitsList: [],
      clocksProps: {
        thc: 0,
        cbd: 0,
      },
    };

    if (!this.setStrainNameFromText(text, context)) {
      throw Error(`Could no parse strain name from: "${text}"`);
    }

    if (!this.setTerpenesFromText(text, terpenesData, context)) {
      throw Error(`Could no parse terpenes from: "${text}"`);
    }

    if (!this.setBenefitsFromText(text, context)) {
      throw Error(`Could no parse benefits from: "${text}"`);
    }

    if (!this.setClocksPropsFromText(text, context)) {
      throw Error(`Could no parse clocks props from: "${text}"`);
    }

    return context;
  }
}
