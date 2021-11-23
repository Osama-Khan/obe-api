import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityController } from './activity.controller';
import { ActivityEntity } from './activity.entity';
import { ActivityService } from './activity.service';
import { ActivityTypeController } from './type/activity-type.controller';
import { ActivityTypeEntity } from './type/activity-type.entity';
import { ActivityTypeService } from './type/activity-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityEntity, ActivityTypeEntity])],
  controllers: [ActivityController, ActivityTypeController],
  providers: [ActivityService, ActivityTypeService],
})
export class ActivityModule {}
