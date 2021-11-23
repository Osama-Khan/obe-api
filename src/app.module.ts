import { UserEntity } from '@api/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from '@api/api.module';
import { db } from './dbconfig';
import { ProgramEntity } from '@api/program/program.entity';
import { CourseEntity } from '@api/course/course.entity';
import { CLOEntity } from '@api/objective/clo/clo.entity';
import { PLOEntity } from '@api/objective/plo/plo.entity';
import { RoleEntity } from '@api/role/role.entity';
import { SectionEntity } from '@api/section/section.entity';
import { AllocationEntity } from '@api/allocation/allocation.entity';
import { ObjectiveMapEntity } from '@api/objective/map/map.entity';
import { ActivityEntity } from '@api/activity/activity.entity';
import { ActivityTypeEntity } from '@api/activity/type/activity-type.entity';
import { AssessmentEntity } from '@api/assessment/assessment.entity';

const apiEntities = [
  ActivityEntity,
  ActivityTypeEntity,
  AllocationEntity,
  AssessmentEntity,
  CLOEntity,
  CourseEntity,
  ObjectiveMapEntity,
  PLOEntity,
  ProgramEntity,
  RoleEntity,
  SectionEntity,
  UserEntity,
];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: db.servername,
      port: 3306,
      username: db.username,
      password: db.password,
      database: db.dbname,
      entities: apiEntities,
      synchronize: true,
    }),
    ApiModule,
  ],
})
export class AppModule {}
