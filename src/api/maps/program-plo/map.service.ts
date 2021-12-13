import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { ProgramPloMapEntity } from './map.entity';

@Injectable()
export class ProgramPloMapService extends ApiService<ProgramPloMapEntity> {
  constructor(
    @InjectRepository(ProgramPloMapEntity)
    repository: Repository<ProgramPloMapEntity>,
  ) {
    super(repository);
  }
}
