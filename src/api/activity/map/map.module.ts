import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityMapController } from './map.controller';
import { ActivityMapEntity } from './map.entity';
import { ActivityMapService } from './map.service';

@Module({
  imports: [TypeOrmModule.forFeature([ActivityMapEntity])],
  controllers: [ActivityMapController],
  providers: [ActivityMapService],
})
export class ActivityMapModule {}
