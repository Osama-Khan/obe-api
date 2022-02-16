import { AllocationEntity } from '@api/allocation/allocation.entity';
import { AssessmentEntity } from '@api/assessment/assessment.entity';
import { CourseEntity } from '@api/course/course.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  In,
  Repository,
} from 'typeorm';
import { ActivityEntity } from './activity.entity';
import { EvaluationEntity } from './evaluation/evaluation.entity';
import { ActivityMapEntity } from './map/map.entity';

@Injectable()
export class ActivityService extends ApiService<ActivityEntity> {
  constructor(
    @InjectRepository(ActivityEntity) repository: Repository<ActivityEntity>,
    @InjectRepository(CourseEntity)
    private crsRepo: Repository<CourseEntity>,
    @InjectRepository(AssessmentEntity)
    private asmRepo: Repository<AssessmentEntity>,

    @InjectRepository(AllocationEntity)
    private alcRepo: Repository<AllocationEntity>,
    @InjectRepository(ActivityMapEntity)
    private amRepository: Repository<ActivityMapEntity>,
    @InjectRepository(EvaluationEntity)
    private evalRepository: Repository<EvaluationEntity>,
  ) {
    super(repository);
  }

  /** Appends complete map or eval objects if their relations are included */
  async findOne(
    conditions: FindConditions<ActivityEntity>,
    criteria?: FindOneOptions<ActivityEntity>,
  ): Promise<ActivityEntity> {
    const data = await super.findOne(conditions, criteria);
    const hasMaps = criteria?.relations?.includes('maps');
    const hasEvals = criteria?.relations?.includes('evaluations');
    if (hasMaps || hasEvals) {
      if (hasMaps)
        data.maps = await this.amRepository.find({
          where: { id: In(data.maps.map((m) => m.id)) },
          relations: ['clo'],
        });
      if (hasEvals)
        data.evaluations = await this.evalRepository.find({
          where: { id: In(data.evaluations.map((e) => e.id)) },
          relations: ['user'],
        });
    }

    return data;
  }

  /** Appends complete map objects if maps relation is included */
  async find(
    criteria?: FindManyOptions<ActivityEntity>,
  ): Promise<ActivityEntity[]> {
    const data = await this.repository.find(criteria);
    // this.alcRepo.find({ relations: ['activities', 'course'] }).then((r) => {
    //   r.forEach(async (a) => {
    //     if (a.activities.length > 0) return;
    //     const course = await this.crsRepo.findOne(a.course.id, {
    //       relations: ['assessments'],
    //     });
    //     const asm1 = await this.asmRepo.findOne(course.assessments[1].id, {
    //       relations: ['type'],
    //     });
    //     const asm2 = await this.asmRepo.findOne(course.assessments[2].id, {
    //       relations: ['type'],
    //     });
    //     this.repository.insert({
    //       allocation: a,
    //       description: `${asm1.type.name} of ${course.titleShort}`,
    //       title: asm1.type.name,
    //       type: asm1.type,
    //       marks: 30,
    //     });
    //     this.repository.insert({
    //       allocation: a,
    //       description: `${asm2.type.name} of ${course.titleShort}`,
    //       title: asm2.type.name,
    //       type: asm2.type,
    //       marks: 30,
    //     });
    //   });
    // });
    // this.repository.find().then(async (acts) => {
    //   acts.forEach((a) => {
    //     this.evalRepository.insert({
    //       activity: a,
    //       marks: Math.round(Math.random() * 30),
    //       user: { id: '2018-ARID-0139' },
    //     });
    //   });
    // });
    // return data;
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

  /** Gets CLOs with their cumulative weights in given allocation
   * @param id ID of the allocation
   */
  async getCloWeightsInSection(id: string) {
    const activities = await this.find({
      relations: ['maps'],
      where: { allocation: id },
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

  /** Gets number of activity for given allocation grouped by type
   * @param id ID of the allocation
   * @returns Number of activities grouped by type in the given allocation
   */
  async getActivityTypeCounts(id: string) {
    const counts: { id: string; name: string; count: number }[] = [];
    const activities = await this.find({
      where: { allocation: id },
      select: ['id'],
      relations: ['type'],
    });
    activities.forEach((a) => {
      const prev = counts.findIndex((c) => c.id === a.type.id);
      if (prev !== -1) {
        counts[prev].count++;
      } else {
        counts.push({ id: a.type.id, name: a.type.name, count: 1 });
      }
    });
    return counts;
  }

  /** Sets evaluations for an activity */
  async setEvaluations(
    id: string,
    data: { user: { id: string }; marks: number }[],
  ) {
    const res = [];
    for (const d of data) {
      const evaluation = this.evalRepository.create({ ...d, activity: { id } });
      const prev = await this.evalRepository.findOne({
        where: { activity: { id }, user: d.user },
      });
      let r = prev;
      if (prev) {
        await this.evalRepository.update(prev.id, evaluation);
      } else {
        r = await this.evalRepository.save(evaluation);
      }
      res.push(r);
    }
    return res;
  }
}
