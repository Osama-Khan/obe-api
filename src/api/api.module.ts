import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ApiController } from './api.controller';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { ProgramModule } from './program/program.module';
import { ObjectiveModule } from './objective/objective.module';
import { RoleModule } from './role/role.module';
import { SectionModule } from './section/section.module';
import { AllocationModule } from './allocation/allocation.module';
import { AuthModule } from './auth/auth.module';
import { ActivityModule } from './activity/activity.module';
import { AssessmentModule } from './assessment/assessment.module';
import { MapsModule } from './maps/maps.module';
import { RemarksModule } from './remarks/remarks.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AllocationModule,
    CourseModule,
    ObjectiveModule,
    MapsModule,
    ProgramModule,
    RoleModule,
    SectionModule,
    UserModule,
    RemarksModule,
    AuthModule,
    ActivityModule,
    AssessmentModule,
  ],
  controllers: [ApiController],
})
export class ApiModule {}
