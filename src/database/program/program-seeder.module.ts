import { ProgramEntity } from '@api/program/program.entity';
import { ProgramService } from '@api/program/program.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramEntity])],
  providers: [ProgramService],
})
export class ProgramSeederModule {}
