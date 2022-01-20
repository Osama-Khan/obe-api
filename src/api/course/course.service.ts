import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { CourseEntity } from './course.entity';

@Injectable()
export class CourseService extends ApiService<CourseEntity> {
  constructor(
    @InjectRepository(CourseEntity) repository: Repository<CourseEntity>,
    @InjectRepository(CLOEntity) private cloRepo: Repository<CLOEntity>,
    @InjectRepository(ProgramEntity)
    private progRepo: Repository<ProgramEntity>,
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
