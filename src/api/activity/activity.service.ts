import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { FindManyOptions, In, Repository } from 'typeorm';
import { ActivityEntity } from './activity.entity';
import { ActivityMapEntity } from './map/map.entity';

@Injectable()
export class ActivityService extends ApiService<ActivityEntity> {
  constructor(
    @InjectRepository(ActivityEntity) repository: Repository<ActivityEntity>,
    @InjectRepository(ActivityMapEntity)
    private amRepository: Repository<ActivityMapEntity>,
  ) {
    super(repository);
  }

  /** Appends complete map objects if maps relation is included */
  async find(
    criteria?: FindManyOptions<ActivityEntity>,
  ): Promise<ActivityEntity[]> {
    const data = await this.repository.find(criteria);
    const activities = [];
    if (criteria?.relations?.includes('maps')) {
      for (const c of data) {
        const maps = await this.amRepository.find({
          where: { id: In(c.maps.map((m) => m.id)) },
          relations: ['clo'],
        });
        activities.push({ ...c, maps });
      }
    }
    return activities.length > 0 ? activities : data;
  }

  /** Gets CLOs with their cumulative weights in given section
   * @param id ID of the section
   */
  async getCloWeightsInSection(id: string) {
    const activities = await this.find({
      relations: ['maps'],
      where: { section: id },
    });
    const clos: { id: string; weight: number }[] = [];
    activities.forEach((a) => {
      a.maps.forEach((a) => {
        const prev = clos.findIndex((c) => c.id === a.clo.id);
        if (prev !== -1) {
          clos[prev].weight += a.weight;
        } else {
          clos.push({ id: a.clo.id, weight: a.weight });
        }
      });
    });
    return clos;
  }
}
