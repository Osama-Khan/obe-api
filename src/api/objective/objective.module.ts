import { Module } from '@nestjs/common';
import { CLOModule } from './clo/clo.module';
import { PLOModule } from './plo/plo.module';

@Module({
  imports: [CLOModule, PLOModule],
})
export class ObjectiveModule {}
