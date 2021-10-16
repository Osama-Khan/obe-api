import { PLOEntity } from '@api/objective/plo/plo.entity';
import { PLOService } from '@api/objective/plo/plo.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramController } from './program.controller';
import { ProgramEntity } from './program.entity';
import { ProgramService } from './program.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramEntity, PLOEntity])],
  controllers: [ProgramController],
  providers: [ProgramService, PLOService],
})
export class ProgramModule {}
