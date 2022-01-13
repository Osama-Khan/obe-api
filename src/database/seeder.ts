import { NestFactory } from '@nestjs/core';
import { LogHelper } from '@shared/helpers';
import seedRoles from './role/role-seeder';
import { SeederModule } from './seeder.module';
import seedPlos from './plo/plo-seeder';
import seedUsers from './user/user-seeder';
import seedActivityTypes from './activity-type/activity-type-seeder';
import seedPrograms from './program/program-seeder';
import seedCourses from './course/course-seeder';

async function seed() {
  const app = await NestFactory.create(SeederModule);
  LogHelper.success('[SEEDING STARTED]');
  LogHelper.info('<--- Activity Type Seeding --->');
  await seedActivityTypes(app);
  LogHelper.info('<--- Program Seeding --->');
  await seedPrograms(app);
  LogHelper.info('<--- Course Seeding --->');
  await seedCourses(app);
  LogHelper.info('<--- PLO Seeding --->');
  await seedPlos(app);
  LogHelper.info('<--- Role Seeding --->');
  await seedRoles(app);
  LogHelper.info('<--- User Seeding --->');
  await seedUsers(app);
  LogHelper.success('[SEEDING COMPLETE]');
  app.close();
}

seed();
