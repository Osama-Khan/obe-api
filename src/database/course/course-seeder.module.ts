import { CourseEntity } from '@api/course/course.entity';
import { CourseService } from '@api/course/course.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CourseEntity])],
  providers: [CourseService],
})
export class CourseSeederModule {}
