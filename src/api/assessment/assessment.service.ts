import { AssessmentEntity } from './assessment.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';

@Injectable()
export class AssessmentService extends ApiService<AssessmentEntity> {
  constructor(
    @InjectRepository(AssessmentEntity)
    repository: Repository<AssessmentEntity>,
  ) {
    super(repository);
  }
}
