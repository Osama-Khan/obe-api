import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseEntity } from './course.entity';
import { CourseService } from './course.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, CLOEntity, ProgramEntity])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
