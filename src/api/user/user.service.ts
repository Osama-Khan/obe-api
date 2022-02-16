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

// const _teachers = [
//   'Ali',
//   'Hashim',
//   'Fahad',
//   'Hamza',
//   'Nasir',
//   'Munir',
//   'Ahsan',
//   'Shahid',
//   'Noor',
//   'Sumaira',
//   'Ayesha',
// ];

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

  // async find(criteria?: any): Promise<any[]> {
  //   _teachers.forEach((t, i) => {
  //     const id = 'biit-' + (112 + i);
  //     const bd = new Date();
  //     const age = Math.random() * 20 + 20;
  //     bd.setFullYear(bd.getFullYear() - age);
  //     this.repository.insert({
  //       id,
  //       username: t,
  //       email: t + '@biit.edu.pk',
  //       password: 'teacher1',
  //       role: { id: 'teacher' },
  //       dateOfBirth: bd,
  //     });
  //   });
  //   return super.find(criteria);
  // }

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

  /**
   * Returns course based PLO result of the student
   * @param id ID of the student
   * @returns Result represented by percentage of PLOs obtained in Courses
   */
  async getTranscript(id: string) {
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

    const result = {
      plos: ploMaps.map((p) => ({ ...p.plo, number: p.number })),
      courses: [],
      activities: [],
      achieved: [],
    };
    for (const e of evals as any) {
      const marks = e.marks / e.activity.marks;
      e.activity = await this.actService.findOne(
        { id: e.activity.id },
        {
          relations: ['allocation', 'maps', 'type'],
        },
      );

      const { course } = (await this.allocRepo.findOne(
        e.activity.allocation.id,
        { relations: ['course'] },
      )) as any;

      e.activity.course = course;

      result.activities.push({ ...e.activity, achieved: e.marks });

      let prevCourse = result.courses.findIndex((c) => c.id === course.id);

      if (prevCourse === -1) {
        course.total = 0;
        course.achieved = 0;
        result.courses.push(course);
        prevCourse = result.courses.length - 1;
      }

      result.courses[prevCourse].total += e.activity.marks;
      result.courses[prevCourse].achieved += e.marks;

      const typeAsm = await this.asmRepo.find({
        where: { course, type: { id: e.activity.type.id } },
        relations: ['type', 'clo'],
      });

      const clos = await this.cloService.find({
        where: { id: In(e.activity.maps.map((m) => m.clo.id)) },
        relations: ['maps', 'course'],
      });

      clos.map((c) => {
        const weightFactor =
          typeAsm.find((a) => a.clo.id === c.id).weight / 100;
        c.maps.map((m) => {
          const resInd = result.achieved.findIndex(
            (r) => r.plo.id === m.plo.id && r.course.id === course.id,
          );
          // marks/e.activity.marks if issue
          const achieved = m.weight * marks * weightFactor;
          if (resInd === -1) {
            result.achieved.push({
              plo: { id: m.plo.id },
              course: {
                id: course.id,
              },
              achieved,
            });
            return;
          }
          result.achieved[resInd].achieved += achieved;
        });
      });
    }
    return result;
  }
}
