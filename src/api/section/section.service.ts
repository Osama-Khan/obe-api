import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { SectionEntity } from './section.entity';

@Injectable()
export class SectionService extends ApiService<SectionEntity> {
  constructor(
    @InjectRepository(SectionEntity) repository: Repository<SectionEntity>,
  ) {
    super(repository);
  }
}
