import { CourseEntity } from '@api/course/course.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { SectionEntity } from '@api/section/section.entity';
import { UserEntity } from '@api/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllocationController } from './allocation.controller';
import { AllocationEntity } from './allocation.entity';
import { AllocationService } from './allocation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AllocationEntity,
      CourseEntity,
      ProgramEntity,
      SectionEntity,
      UserEntity,
    ]),
  ],
  controllers: [AllocationController],
  providers: [AllocationService],
})
export class AllocationModule {}
