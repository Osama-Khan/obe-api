import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectiveMapController } from './map.controller';
import { ObjectiveMapEntity } from './map.entity';
import { ObjectiveMapService } from './map.service';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectiveMapEntity])],
  controllers: [ObjectiveMapController],
  providers: [ObjectiveMapService],
})
export class ObjectiveMapModule {}
