import { UserEntity } from '@api/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from '@api/api.module';
import { db } from './dbconfig';
import { ProgramEntity } from '@api/program/program.entity';
import { CourseEntity } from '@api/course/course.entity';

const apiEntities = [CourseEntity, ProgramEntity, UserEntity];

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
