import { RemarksEntity } from './remarks.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';

@Injectable()
export class RemarksService extends ApiService<RemarksEntity> {
  constructor(
    @InjectRepository(RemarksEntity)
    repository: Repository<RemarksEntity>,
  ) {
    super(repository);
  }
}
