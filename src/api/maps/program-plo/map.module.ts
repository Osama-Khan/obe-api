import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramPloMapController } from './map.controller';
import { ProgramPloMapEntity } from './map.entity';
import { ProgramPloMapService } from './map.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramPloMapEntity])],
  controllers: [ProgramPloMapController],
  providers: [ProgramPloMapService],
})
export class ProgramPloMapModule {}
