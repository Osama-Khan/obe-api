import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { AllocationEntity } from './allocation.entity';

@Injectable()
export class AllocationService extends ApiService<AllocationEntity> {
  constructor(
    @InjectRepository(AllocationEntity)
    repository: Repository<AllocationEntity>,
  ) {
    super(repository);
  }
}
