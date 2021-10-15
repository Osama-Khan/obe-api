import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { CLOEntity } from './clo.entity';

@Injectable()
export class CLOService extends ApiService<CLOEntity> {
  constructor(@InjectRepository(CLOEntity) repository: Repository<CLOEntity>) {
    super(repository);
  }
}
