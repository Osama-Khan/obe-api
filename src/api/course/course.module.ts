import { AllocationEntity } from '@api/allocation/allocation.entity';
import { AssessmentEntity } from '@api/assessment/assessment.entity';
import { ProgramPloMapEntity } from '@api/maps/program-plo/map.entity';
import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ObjectiveMapEntity } from '@api/objective/map/map.entity';
import { PLOEntity } from '@api/objective/plo/plo.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { RemarksEntity } from '@api/remarks/remarks.entity';
import { UserEntity } from '@api/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from './course.controller';
import { CourseEntity } from './course.entity';
import { CourseService } from './course.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AllocationEntity,
      AssessmentEntity,
      CourseEntity,
      CLOEntity,
      ProgramEntity,
      ObjectiveMapEntity,
      ProgramPloMapEntity,
      RemarksEntity,
      UserEntity,
    ]),
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
