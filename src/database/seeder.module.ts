import { ActivityEntity } from '@api/activity/activity.entity';
import { ActivityTypeEntity } from '@api/activity/type/activity-type.entity';
import { AllocationEntity } from '@api/allocation/allocation.entity';
import { AssessmentEntity } from '@api/assessment/assessment.entity';
import { CourseEntity } from '@api/course/course.entity';
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
import { PLOSeederModule } from './plo/plo-seeder.module';
import { RoleSeederModule } from './role/role-seeder.module';
import { UserSeederModule } from './user/user-seeder.module';

const seedEntities = [
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
      entities: seedEntities,
      synchronize: true,
    }),
    ActivityTypeSeederModule,
    RoleSeederModule,
    UserSeederModule,
    PLOSeederModule,
  ],
})
export class SeederModule {}
