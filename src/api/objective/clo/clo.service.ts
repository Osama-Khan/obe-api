import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { FindManyOptions, In, Repository } from 'typeorm';
import { ObjectiveMapEntity } from '../map/map.entity';
import { CLOEntity } from './clo.entity';

@Injectable()
export class CLOService extends ApiService<CLOEntity> {
  constructor(
    @InjectRepository(CLOEntity) repository: Repository<CLOEntity>,
    @InjectRepository(ObjectiveMapEntity)
    private omRepository: Repository<ObjectiveMapEntity>,
  ) {
    super(repository);
  }

  /** Appends complete map objects if maps relation is included */
  async find(criteria?: FindManyOptions<CLOEntity>): Promise<CLOEntity[]> {
    const data = await this.repository.find(criteria);
    const clos = [];
    if (criteria?.relations?.includes('maps')) {
      for (const c of data) {
        const maps = await this.omRepository.find({
          where: { id: In(c.maps.map((m) => m.id)) },
          relations: ['plo'],
        });
        clos.push({ ...c, maps });
      }
    }
    return clos.length > 0 ? clos : data;
  }
}
