import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramController } from './program.controller';
import { ProgramEntity } from './program.entity';
import { ProgramService } from './program.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramEntity])],
  controllers: [ProgramController],
  providers: [ProgramService],
})
export class ProgramModule {}
