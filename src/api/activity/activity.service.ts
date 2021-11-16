import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { ActivityEntity } from './activity.entity';

@Injectable()
export class ActivityService extends ApiService<ActivityEntity> {
  constructor(
    @InjectRepository(ActivityEntity) repository: Repository<ActivityEntity>,
  ) {
    super(repository);
  }
}
