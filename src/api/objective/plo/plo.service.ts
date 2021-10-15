import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { PLOEntity } from './plo.entity';

@Injectable()
export class PLOService extends ApiService<PLOEntity> {
  constructor(@InjectRepository(PLOEntity) repository: Repository<PLOEntity>) {
    super(repository);
  }
}
