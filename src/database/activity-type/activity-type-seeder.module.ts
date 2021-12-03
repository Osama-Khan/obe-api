import { ActivityTypeEntity } from '@api/activity/type/activity-type.entity';
import { ActivityTypeService } from '@api/activity/type/activity-type.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityTypeEntity])],
  providers: [ActivityTypeService],
})
export class ActivityTypeSeederModule {}
