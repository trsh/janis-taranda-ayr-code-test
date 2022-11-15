import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ParserModule } from './parser/parser.module';
import { TasksModule } from './tasks/tasks.module';
import AppDataSource from './data.source';
import { TasksService } from './tasks/tasks.service';

/**
 * Main app module
 */
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: <string>AppDataSource.options.database,
      autoLoadEntities: true,
      synchronize: true, // NOTE: this is dangrous and should not be used for real product, instead full migration pipe
    }),
    ScheduleModule.forRoot(),
    ParserModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly tasksService: TasksService) {}

  onModuleInit() {
    console.log(`Initialization...`);
    this.tasksService.handleCron();
  }
}
