import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ParserModule } from '../parser/parser.module';

/**
 * Task module
 */
@Module({
  imports: [ParserModule],
  providers: [TasksService],
  exports: [TasksService]
})
export class TasksModule {}
