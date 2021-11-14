import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ObjectiveMapEntity } from '../map/map.entity';
import { CLOController } from './clo.controller';
import { CLOEntity } from './clo.entity';
import { CLOService } from './clo.service';

@Module({
  imports: [TypeOrmModule.forFeature([CLOEntity, ObjectiveMapEntity])],
  controllers: [CLOController],
  providers: [CLOService],
})
export class CLOModule {}
