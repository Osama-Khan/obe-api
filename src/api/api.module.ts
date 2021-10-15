import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiController } from './api.controller';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { ProgramModule } from './program/program.module';
import { ObjectiveModule } from './objective/objective.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CourseModule,
    ObjectiveModule,
    ProgramModule,
    UserModule,
  ],
  controllers: [ApiController],
})
export class ApiModule {}
