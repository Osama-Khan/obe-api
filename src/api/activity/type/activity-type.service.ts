import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { ActivityTypeEntity } from './activity-type.entity';

@Injectable()
export class ActivityTypeService extends ApiService<ActivityTypeEntity> {
  constructor(
    @InjectRepository(ActivityTypeEntity)
    repository: Repository<ActivityTypeEntity>,
  ) {
    super(repository);
  }
}
