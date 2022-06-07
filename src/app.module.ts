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
import { ActivityMapEntity } from '@api/activity/map/map.entity';
import { ProgramPloMapEntity } from '@api/maps/program-plo/map.entity';
import { EvaluationEntity } from '@api/activity/evaluation/evaluation.entity';
import { QuestionEntity } from '@api/activity/question/question.entity';

const apiEntities = [
  ActivityEntity,
  ActivityTypeEntity,
  ActivityMapEntity,
  AllocationEntity,
  AssessmentEntity,
  CLOEntity,
  CourseEntity,
  EvaluationEntity,
  ObjectiveMapEntity,
  PLOEntity,
  ProgramEntity,
  ProgramPloMapEntity,
  QuestionEntity,
  RoleEntity,
  SectionEntity,
  UserEntity,
];

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: db.servername,
      port: db.port || 3306,
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
