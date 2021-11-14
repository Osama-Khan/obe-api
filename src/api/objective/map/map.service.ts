import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { ObjectiveMapEntity } from './map.entity';

@Injectable()
export class ObjectiveMapService extends ApiService<ObjectiveMapEntity> {
  constructor(
    @InjectRepository(ObjectiveMapEntity)
    repository: Repository<ObjectiveMapEntity>,
  ) {
    super(repository);
  }
}
