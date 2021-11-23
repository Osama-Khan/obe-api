import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssessmentController } from './assessment.controller';
import { AssessmentEntity } from './assessment.entity';
import { AssessmentService } from './assessment.service';

@Module({
  imports: [TypeOrmModule.forFeature([AssessmentEntity])],
  controllers: [AssessmentController],
  providers: [AssessmentService],
})
export class AssessmentModule {}
