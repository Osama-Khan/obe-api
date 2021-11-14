import { Module } from '@nestjs/common';
import { CLOModule } from './clo/clo.module';
import { ObjectiveMapModule } from './map/map.module';
import { PLOModule } from './plo/plo.module';

@Module({
  imports: [CLOModule, PLOModule, ObjectiveMapModule],
})
export class ObjectiveModule {}
