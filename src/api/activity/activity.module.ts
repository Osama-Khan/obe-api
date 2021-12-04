import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityController } from './activity.controller';
import { ActivityEntity } from './activity.entity';
import { ActivityService } from './activity.service';
import { ActivityMapController } from './map/map.controller';
import { ActivityMapEntity } from './map/map.entity';
import { ActivityMapService } from './map/map.service';
import { ActivityTypeController } from './type/activity-type.controller';
import { ActivityTypeEntity } from './type/activity-type.entity';
import { ActivityTypeService } from './type/activity-type.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ActivityEntity,
      ActivityTypeEntity,
      ActivityMapEntity,
    ]),
  ],
  controllers: [
    ActivityController,
    ActivityTypeController,
    ActivityMapController,
  ],
  providers: [ActivityService, ActivityTypeService, ActivityMapService],
})
export class ActivityModule {}
