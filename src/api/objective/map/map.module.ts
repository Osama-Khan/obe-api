import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CLOEntity } from '../clo/clo.entity';
import { ObjectiveMapController } from './map.controller';
import { ObjectiveMapEntity } from './map.entity';
import { ObjectiveMapService } from './map.service';

@Module({
  imports: [TypeOrmModule.forFeature([ObjectiveMapEntity, CLOEntity])],
  controllers: [ObjectiveMapController],
  providers: [ObjectiveMapService],
})
export class ObjectiveMapModule {}
