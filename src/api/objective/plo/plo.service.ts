import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { CLOEntity } from '../clo/clo.entity';
import { ObjectiveMapEntity } from '../map/map.entity';
import { PLOEntity } from './plo.entity';

@Injectable()
export class PLOService extends ApiService<PLOEntity> {
  constructor(
    @InjectRepository(PLOEntity) repository: Repository<PLOEntity>,
    @InjectRepository(ObjectiveMapEntity)
    private omRepo: Repository<ObjectiveMapEntity>,
    @InjectRepository(CLOEntity)
    private cloRepo: Repository<CLOEntity>,
  ) {
    super(repository);
  }

  /** Gets the CLO mappings of a PLO */
  async getMappings(id: string) {
    let maps = await this.omRepo.find({
      where: { plo: id },
      relations: ['clo'],
    });
    const mapsWithCourse = [];
    for (const m of maps) {
      const clo = await this.cloRepo.findOne(m.clo.id, {
        relations: ['course'],
      });
      mapsWithCourse.push({ ...m, clo });
    }
    return mapsWithCourse;
  }
}
