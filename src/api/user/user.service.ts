import { ActivityService } from '@api/activity/activity.service';
import { EvaluationEntity } from '@api/activity/evaluation/evaluation.entity';
import { AllocationEntity } from '@api/allocation/allocation.entity';
import { AssessmentEntity } from '@api/assessment/assessment.entity';
import { ProgramPloMapEntity } from '@api/maps/program-plo/map.entity';
import { CLOService } from '@api/objective/clo/clo.service';
import { PLOEntity } from '@api/objective/plo/plo.entity';
import { SectionEntity } from '@api/section/section.entity';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { In, Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService extends ApiService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
    @InjectRepository(AllocationEntity)
    private allocRepo: Repository<AllocationEntity>,
    @InjectRepository(AssessmentEntity)
    private asmRepo: Repository<AssessmentEntity>,
    @InjectRepository(EvaluationEntity)
    private evalRepo: Repository<EvaluationEntity>,
    @InjectRepository(SectionEntity)
    private sectionRepo: Repository<SectionEntity>,
    @InjectRepository(ProgramPloMapEntity)
    private progPloRepo: Repository<ProgramPloMapEntity>,
    @Inject(CLOService) private cloService: CLOService,
    @Inject(ActivityService) private actService: ActivityService,
  ) {
    super(repository);
  }

  /**
   * Returns result of the student
   * @param id ID of the student
   * @returns Result represented by percentage obtained in PLOs
   */
  async getResult(id: string) {
    const user = await this.findOne({ id }, { relations: ['sections'] });
    if (!user) throw new NotFoundException('User not found!');

    const section = await this.sectionRepo.findOne(user.sections[0].id, {
      relations: ['program'],
    });
    const ploMaps = await this.progPloRepo.find({
      where: { program: section.program.id },
      relations: ['plo'],
    });

    let evals = await this.evalRepo.find({
      where: { user: { id } },
      relations: ['user', 'activity'],
    });

    let results: {
      plo: PLOEntity;
      evaluated: number;
      achieved: number;
    }[] = ploMaps
      .map((m) => ({
        plo: { ...m.plo, number: m.number },
        evaluated: 0,
        achieved: 0,
      }))
      .sort((a, b) => a.plo.number - b.plo.number);
    for (const e of evals) {
      const marks = e.marks / e.activity.marks;
      e.activity = await this.actService.findOne(
        { id: e.activity.id },
        {
          relations: ['allocation', 'maps', 'type'],
        },
      );

      const { course } = await this.allocRepo.findOne(
        e.activity.allocation.id,
        { relations: ['course'] },
      );
      const typeAsm = await this.asmRepo.find({
        where: { course, type: { id: e.activity.type.id } },
        relations: ['type', 'clo'],
      });

      const clos = await this.cloService.find({
        where: { id: In(e.activity.maps.map((m) => m.clo.id)) },
        relations: ['maps'],
      });

      clos.map((c) => {
        const weightFactor =
          typeAsm.find((a) => a.clo.id === c.id).weight / 100;
        c.maps.map((m) => {
          const resInd = results.findIndex((r) => r.plo.id === m.plo.id);
          const evaluated = m.weight;
          const achieved = m.weight * marks;
          results[resInd].evaluated += evaluated * weightFactor;
          results[resInd].achieved += achieved * weightFactor;
        });
      });
    }
    return results;
  }

  /**
   * Returns detailed result of the student
   * @param id ID of the student
   * @param ploId ID of the plo
   * @returns Result object containing detailed evaluations
   */
  async getResultDetail(id: string, ploId: string) {
    const user = await this.findOne({ id }, { relations: ['sections'] });
    if (!user) throw new NotFoundException('User not found!');

    const section = await this.sectionRepo.findOne(user.sections[0].id, {
      relations: ['program'],
    });
    const ploMap = await this.progPloRepo.findOne(ploId, {
      relations: ['plo'],
    });

    let evals = await this.evalRepo.find({
      where: { user: { id } },
      relations: ['user', 'activity'],
    });

    let results: any[] = [];
    for (const e of evals) {
      e.activity = await this.actService.findOne(
        { id: e.activity.id },
        {
          relations: ['allocation', 'maps', 'type'],
        },
      );

      let clos = await this.cloService.find({
        where: { id: In(e.activity.maps.map((m) => m.clo.id)) },
        relations: ['maps'],
      });

      clos = clos.filter((c) => c.maps.some((m) => m.plo.id === ploId));
      if (clos.length === 0) continue;

      const { course } = await this.allocRepo.findOne(
        e.activity.allocation.id,
        { relations: ['course'] },
      );
      const assessments = await this.asmRepo.find({
        where: { course, type: { id: e.activity.type.id } },
        relations: ['type', 'clo'],
      });

      results.push({
        activity: e.activity,
        course,
        obtained: e.marks,
        assessments,
        clos,
      });
    }
    return results;
  }
}
