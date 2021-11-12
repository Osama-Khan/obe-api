import { PLOService } from '@api/objective/plo/plo.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { ProgramEntity } from './program.entity';

@Injectable()
export class ProgramService extends ApiService<ProgramEntity> {
  constructor(
    @InjectRepository(ProgramEntity) repository: Repository<ProgramEntity>,
    @Inject(PLOService) private ploService: PLOService,
  ) {
    super(repository);
  }
}
