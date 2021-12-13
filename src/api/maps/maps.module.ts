import { Module } from '@nestjs/common';
import { ProgramPloMapModule } from './program-plo/map.module';

/** A "wrapper" module for the map (m2m relations with extra attributes) modules */
@Module({
  imports: [ProgramPloMapModule],
})
export class MapsModule {}
