import { AllocationEntity } from '@api/allocation/allocation.entity';
import { SectionEntity } from '@api/section/section.entity';
import { UserEntity } from '@api/user/user.entity';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Workbook } from 'exceljs';
import { ObjectID, Repository } from 'typeorm';
import { CourseEntity } from '@api/course/course.entity';
import { ExcelDataNotFoundException } from '../allocation/exceptions';

@Injectable()
export class AllocationService extends ApiService<AllocationEntity> {
  constructor(
    @InjectRepository(AllocationEntity)
    repository: Repository<AllocationEntity>,
    @InjectRepository(CourseEntity)
    private courseRepository: Repository<CourseEntity>,
    @InjectRepository(SectionEntity)
    private sectionRepository: Repository<SectionEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  /** Receives b64 encoded xlsx file and applies allocation
   * data to database
   */
  async applyAllocationFile(b64: string) {
    const buffer = Buffer.from(b64, 'base64');
    const { worksheets } = await new Workbook().xlsx.load(buffer);
    const data: Partial<AllocationEntity>[] = [];
    let subjectCode: string,
      sectionId: string,
      teacherId: string | number | Date | ObjectID;
    for (let n = 1; n <= worksheets[0].rowCount; n++) {
      try {
        const r = worksheets[0].getRow(n);
        subjectCode = r.getCell(1).value.toString();
        sectionId = r.getCell(2).value.toString();
        teacherId = r.getCell(4).value.toString();
      } catch (e) {
        throw new BadRequestException(
          'Error parsing the file. Make sure the format is correct!\nAt row # ' +
            n,
        );
      }

      // Subject validation
      const subject = await this.courseRepository.findOne({
        where: { id: subjectCode },
      });
      if (!subject)
        throw new ExcelDataNotFoundException('Subject code', subjectCode, n);

      // Section validation
      const section = await this.sectionRepository.findOne(sectionId, {
        relations: ['program'],
      });
      if (!section) {
        throw new ExcelDataNotFoundException('Section', sectionId, n);
      }

      // Teacher validation
      const teacher = await this.userRepository.findOne(teacherId);
      if (!teacher) {
        throw new ExcelDataNotFoundException('Teacher ID', teacherId, n);
      }

      const course = subject;
      const user = teacher;

      data.push(this.repository.create({ user, course, section }));
    }

    for (let d of data) {
      await this.repository.insert(d);
    }

    return HttpStatus.OK;
  }
}
