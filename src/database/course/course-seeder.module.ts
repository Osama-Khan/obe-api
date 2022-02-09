import { CourseEntity } from '@api/course/course.entity';
import { CourseService } from '@api/course/course.service';
import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity, CLOEntity, ProgramEntity])],
  providers: [CourseService],
})
export class CourseSeederModule {}
