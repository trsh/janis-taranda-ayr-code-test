import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ParserService } from '../parser/parser.service';

/**
 * Task services for scheduled jobs
 */
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private syncInProgres = false;

  constructor(private readonly parserService: ParserService) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async handleCron() {
    if (this.syncInProgres) {
      return;
    }
    this.syncInProgres = true;
    try {
      await this.parserService.syncSentencesSets();
    } catch (err: any) {
      this.logger.error(err);
    }
    this.syncInProgres = false;
  }
}
