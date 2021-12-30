import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CLOEntity } from '../clo/clo.entity';
import { ObjectiveMapEntity } from '../map/map.entity';
import { PLOController } from './plo.controller';
import { PLOEntity } from './plo.entity';
import { PLOService } from './plo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PLOEntity, ObjectiveMapEntity, CLOEntity]),
  ],
  controllers: [PLOController],
  providers: [PLOService],
})
export class PLOModule {}
