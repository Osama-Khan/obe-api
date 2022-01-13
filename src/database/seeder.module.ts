import { ActivityEntity } from '@api/activity/activity.entity';
import { EvaluationEntity } from '@api/activity/evaluation/evaluation.entity';
import { ActivityMapEntity } from '@api/activity/map/map.entity';
import { QuestionEntity } from '@api/activity/question/question.entity';
import { ActivityTypeEntity } from '@api/activity/type/activity-type.entity';
import { AllocationEntity } from '@api/allocation/allocation.entity';
import { AssessmentEntity } from '@api/assessment/assessment.entity';
import { CourseEntity } from '@api/course/course.entity';
import { ProgramPloMapEntity } from '@api/maps/program-plo/map.entity';
import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ObjectiveMapEntity } from '@api/objective/map/map.entity';
import { PLOEntity } from '@api/objective/plo/plo.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { RoleEntity } from '@api/role/role.entity';
import { SectionEntity } from '@api/section/section.entity';
import { UserEntity } from '@api/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { db } from 'src/dbconfig';
import { ActivityTypeSeederModule } from './activity-type/activity-type-seeder.module';
import { CourseSeederModule } from './course/course-seeder.module';
import { PLOSeederModule } from './plo/plo-seeder.module';
import { ProgramSeederModule } from './program/program-seeder.module';
import { RoleSeederModule } from './role/role-seeder.module';
import { UserSeederModule } from './user/user-seeder.module';

const seedEntities = [
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
      port: 3306,
      username: db.username,
      password: db.password,
      database: db.dbname,
      entities: seedEntities,
      synchronize: true,
    }),
    ActivityTypeSeederModule,
    CourseSeederModule,
    RoleSeederModule,
    UserSeederModule,
    PLOSeederModule,
    ProgramSeederModule,
  ],
})
export class SeederModule {}
