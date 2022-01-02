import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { In, Repository } from 'typeorm';
import { CLOEntity } from '../clo/clo.entity';
import { ObjectiveMapEntity } from './map.entity';

@Injectable()
export class ObjectiveMapService extends ApiService<ObjectiveMapEntity> {
  constructor(
    @InjectRepository(ObjectiveMapEntity)
    repository: Repository<ObjectiveMapEntity>,
    @InjectRepository(CLOEntity) private cloRepo: Repository<CLOEntity>,
  ) {
    super(repository);
  }

  /** Gets the maps for given program and course */
  async getCourseMaps(pid: string, cid: string) {
    const clos = await this.cloRepo.find({
      where: { course: { id: cid } },
      select: ['id'],
    });
    return this.repository.find({
      where: { clo: { id: In(clos.map((c) => c.id)) }, program: { id: pid } },
      relations: ['clo', 'plo'],
    });
  }
}
