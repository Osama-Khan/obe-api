import { PLOService } from '@api/objective/plo/plo.service';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { DeepPartial, Repository } from 'typeorm';
import { ProgramEntity } from './program.entity';

@Injectable()
export class ProgramService extends ApiService<ProgramEntity> {
  constructor(
    @InjectRepository(ProgramEntity) repository: Repository<ProgramEntity>,
    @Inject(PLOService) private ploService: PLOService,
  ) {
    super(repository);
  }

  async insert(data: DeepPartial<ProgramEntity>) {
    const { plos, ...prog } = data;
    const program = await super.insert(prog);
    for (let i in plos) {
      await this.ploService.insert({ ...data.plos[i], program });
    }
    return { plos, ...program };
  }
}
