import { ActivityEntity } from '@api/activity/activity.entity';
import { ActivityService } from '@api/activity/activity.service';
import { EvaluationEntity } from '@api/activity/evaluation/evaluation.entity';
import { ActivityMapEntity } from '@api/activity/map/map.entity';
import { ProgramPloMapEntity } from '@api/maps/program-plo/map.entity';
import { CLOEntity } from '@api/objective/clo/clo.entity';
import { CLOService } from '@api/objective/clo/clo.service';
import { ObjectiveMapEntity } from '@api/objective/map/map.entity';
import { SectionEntity } from '@api/section/section.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityEntity,
      ActivityMapEntity,
      CLOEntity,
      EvaluationEntity,
      ObjectiveMapEntity,
      ProgramPloMapEntity,
      SectionEntity,
      UserEntity,
    ]),
  ],
  controllers: [UserController],
  providers: [ActivityService, CLOService, UserService],
})
export class UserModule {}
