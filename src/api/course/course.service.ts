import { AllocationEntity } from '@api/allocation/allocation.entity';
import { AssessmentEntity } from '@api/assessment/assessment.entity';
import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { RemarksEntity } from '@api/remarks/remarks.entity';
import { UserEntity } from '@api/user/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { CourseEntity } from './course.entity';

const _ids = [
  '4aece8fa-b1c0-4987-9565-53d249d988d4',
  '63772de4-f0c6-4061-8026-7e4d86aee25b',
  '975153e7-4e6b-4509-9770-3df192aeaec4',
  'dd8161c6-31fb-4bdc-8f23-78b71a54a1ce',
  'f1c9ec1a-9d16-4551-83d0-a413e5f17ddb',
  'fb7805d5-b4dd-4057-add2-20b832e05b59',
];
enum _t {
  Assignment = '4aece8fa-b1c0-4987-9565-53d249d988d4',
  Mid = '63772de4-f0c6-4061-8026-7e4d86aee25b',
  Pres = '975153e7-4e6b-4509-9770-3df192aeaec4',
  Quiz = 'dd8161c6-31fb-4bdc-8f23-78b71a54a1ce',
  Lab = 'f1c9ec1a-9d16-4551-83d0-a413e5f17ddb',
  Final = 'fb7805d5-b4dd-4057-add2-20b832e05b59',
}

@Injectable()
export class CourseService extends ApiService<CourseEntity> {
  constructor(
    @InjectRepository(CourseEntity) repository: Repository<CourseEntity>,
    @InjectRepository(CLOEntity) private cloRepo: Repository<CLOEntity>,
    @InjectRepository(AssessmentEntity)
    private assmRepo: Repository<AssessmentEntity>,
    @InjectRepository(RemarksEntity)
    private remRepo: Repository<RemarksEntity>,
    @InjectRepository(ProgramEntity)
    private progRepo: Repository<ProgramEntity>,
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {
    super(repository);
  }

  /** Gets list of courses with booleans representing if attention is required */
  async getWithActions(programId: string) {
    const program = await this.progRepo.findOne(programId, {
      relations: ['courses'],
    });
    if (!program)
      throw new BadRequestException(`No Program found with ID ${programId}`);

    // // Random assessment
    // const ex = ['CS335', 'CS300', 'CS323', 'CS423'];
    // program.courses.forEach(async (c) => {
    //   let ids = [..._ids];
    //   const course = await this.repository.findOne(c.id, {
    //     relations: ['clos'],
    //   });
    //   if (ex.includes(course.id)) return;

    //   course.clos.map((c) => {
    //     const randT =
    //       ids.length > 0
    //         ? parseInt((Math.random() * (ids.length - 1)).toString())
    //         : 0;
    //     const type = ids[randT];
    //     ids = ids.filter((i) => i !== type);
    //     this.assmRepo.insert({
    //       course,
    //       program,
    //       clo: c,
    //       type: { id: type },
    //       weight: 100,
    //     });
    //   });
    // });

    // // Random Remarks
    // const teachers = await this.userRepo.find({ where: { role: 'teacher' } });
    // const student = await this.userRepo.findOne('01-TEST-2345');
    // const remarks = ['Good student', 'Bad behavior', 'Undisciplined'];
    // program.courses.map((c) => {
    //   const sem = Math.round(Math.random() * 7) + 1;
    //   const teacher =
    //     teachers[Math.round(Math.random() * (teachers.length - 1))];
    //   this.remRepo.insert({
    //     course: c,
    //     teacher,
    //     student,
    //     section: { id: `BSCSAI-${sem}A` },
    //     text: remarks[Math.round(Math.random() * (remarks.length - 1))],
    //   });
    // });
    // return;
    const courses = [];
    for (const course of program.courses) {
      const { clos, plos, assessments, ...c } = await this.repository.findOne(
        course.id,
        {
          relations: ['clos', 'plos', 'assessments'],
        },
      );

      let needsPlos = false,
        needsClos = false,
        needsAssessment = false;

      // If course has no PLOs then it needs AbstractMapping
      if (plos.length === 0) {
        needsPlos = true;
      }

      // If any of the course CLOs has 0 weight, then it needs weights
      if (clos.length > 0) {
        for (let clo of clos) {
          clo = await this.cloRepo.findOne(clo.id, { relations: ['maps'] });
          if (clo.maps.length > 0 && clo.maps[0].weight === 0) {
            needsClos = true;
            break;
          }
        }
      }

      // If assessment is pending, then it needs approval
      needsAssessment = assessments.length > 0 && !assessments[0].isApproved;

      courses.push({
        ...c,
        needsPlos,
        needsClos,
        needsAssessment,
      });
    }
    return courses;
  }

  /** Sets Abstract Mapping for a course */
  async addAbstractMapping(id: string, plos: string[]) {
    const values = plos.map((p) => `('${id}', '${p}')`).join(',');
    await this.repository.query(
      `insert into abstract_mapping (course_id, plo_id) values ${values}`,
    );
    return this.repository.findOne(id, { relations: ['plos'] });
  }
}
