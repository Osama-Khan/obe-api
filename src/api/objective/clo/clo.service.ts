import { ActivityMapEntity } from '@api/activity/map/map.entity';
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
    @InjectRepository(ActivityMapEntity)
    private amRepository: Repository<ActivityMapEntity>,
  ) {
    super(repository);
  }

  /** Appends complete map objects if maps relation is included */
  async find(criteria?: FindManyOptions<CLOEntity>): Promise<CLOEntity[]> {
    const data = await this.repository.find(criteria);
    const clos = [];
    const hasMaps = criteria?.relations?.includes('maps');
    const hasActMaps = criteria?.relations?.includes('activityMaps');
    if (hasMaps || hasActMaps) {
      for (const c of data) {
        const maps =
          hasMaps &&
          (await this.omRepository.find({
            where: { id: In(c.maps.map((m) => m.id)) },
            relations: ['plo'],
          }));
        const activityMaps =
          hasActMaps &&
          (await this.amRepository.find({
            where: { id: In(c.activityMaps.map((m) => m.id)) },
            relations: ['activity'],
          }));

        const clo = { ...c };
        if (hasMaps) clo.maps = maps || [];
        if (hasActMaps) clo.activityMaps = activityMaps || [];

        clos.push(clo);
      }
    }
    return clos.length > 0 ? clos : data;
  }
}
