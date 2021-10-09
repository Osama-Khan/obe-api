import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { ProgramEntity } from './program.entity';

@Injectable()
export class ProgramService extends ApiService<ProgramEntity> {
  constructor(
    @InjectRepository(ProgramEntity) repository: Repository<ProgramEntity>,
  ) {
    super(repository);
  }
}
