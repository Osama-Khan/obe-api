import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemarksController } from './remarks.controller';
import { RemarksEntity } from './remarks.entity';
import { RemarksService } from './remarks.service';

@Module({
  imports: [TypeOrmModule.forFeature([RemarksEntity])],
  controllers: [RemarksController],
  providers: [RemarksService],
})
export class RemarksModule {}
