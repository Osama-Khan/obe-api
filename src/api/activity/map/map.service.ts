import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { ActivityMapEntity } from './map.entity';

@Injectable()
export class ActivityMapService extends ApiService<ActivityMapEntity> {
  constructor(
    @InjectRepository(ActivityMapEntity)
    repository: Repository<ActivityMapEntity>,
  ) {
    super(repository);
  }
}
