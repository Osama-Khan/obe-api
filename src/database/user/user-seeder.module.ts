import { ActivityEntity } from '@api/activity/activity.entity';
import { ActivityService } from '@api/activity/activity.service';
import { EvaluationEntity } from '@api/activity/evaluation/evaluation.entity';
import { ActivityMapEntity } from '@api/activity/map/map.entity';
import { AllocationEntity } from '@api/allocation/allocation.entity';
import { AssessmentEntity } from '@api/assessment/assessment.entity';
import { ProgramPloMapEntity } from '@api/maps/program-plo/map.entity';
import { CLOEntity } from '@api/objective/clo/clo.entity';
import { CLOService } from '@api/objective/clo/clo.service';
import { ObjectiveMapEntity } from '@api/objective/map/map.entity';
import { RoleEntity } from '@api/role/role.entity';
import { RoleService } from '@api/role/role.service';
import { SectionEntity } from '@api/section/section.entity';
import { UserEntity } from '@api/user/user.entity';
import { UserService } from '@api/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityEntity,
      ActivityMapEntity,
      AllocationEntity,
      AssessmentEntity,
      CLOEntity,
      EvaluationEntity,
      ObjectiveMapEntity,
      ProgramPloMapEntity,
      RoleEntity,
      SectionEntity,
      UserEntity,
    ]),
  ],
  providers: [ActivityService, CLOService, RoleService, UserService],
})
export class UserSeederModule {}
