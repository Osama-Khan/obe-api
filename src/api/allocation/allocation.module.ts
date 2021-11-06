import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllocationController } from './allocation.controller';
import { AllocationEntity } from './allocation.entity';
import { AllocationService } from './allocation.service';

@Module({
  imports: [TypeOrmModule.forFeature([AllocationEntity])],
  controllers: [AllocationController],
  providers: [AllocationService],
})
export class AllocationModule {}
