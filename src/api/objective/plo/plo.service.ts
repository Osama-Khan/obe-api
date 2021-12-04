import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { FindManyOptions, Repository } from 'typeorm';
import { PLOEntity } from './plo.entity';

@Injectable()
export class PLOService extends ApiService<PLOEntity> {
  constructor(@InjectRepository(PLOEntity) repository: Repository<PLOEntity>) {
    super(repository);
  }

  async find(criteria?: FindManyOptions<PLOEntity>): Promise<PLOEntity[]> {
    if (!criteria) criteria = { order: { number: 'ASC' } };
    else if (!criteria.order) criteria.order = { number: 'ASC' };
    return super.find(criteria);
  }
}
