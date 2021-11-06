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
      sectionString: string,
      sectionObj: { program: any; semester: any; name: any },
      teacherName: string,
      teacherId: string | number | Date | ObjectID;
    for (let n = 1; n <= worksheets[0].rowCount; n++) {
      try {
        const r = worksheets[0].getRow(n);
        subjectCode = r.getCell(1).value.toString();
        sectionString = r.getCell(2).value.toString();
        teacherName = r.getCell(3).value.toString();
        teacherId = r.getCell(4).value.toString();
        sectionObj = this.sectionStringToObject(sectionString);
      } catch (e) {
        throw new BadRequestException(
          'Error parsing the file. Make sure the format is correct!\nAt row # ' +
            n,
        );
      }

      const { name, semester, program } = sectionObj;

      // Subject validation
      const subject = await this.courseRepository.findOne({
        where: { code: subjectCode },
      });
      if (!subject)
        throw new ExcelDataNotFoundException('Subject code', subjectCode, n);

      // Section validation
      const sections = await this.sectionRepository.find({
        where: { name, semester },
        relations: ['programs'],
      });
      if (
        sections.length === 0 ||
        !sections.some((s) => s.programs.some((p) => p.title === program))
      ) {
        throw new ExcelDataNotFoundException('Section', sectionString, n);
      }

      // Teacher validation
      const teacher = await this.userRepository.findOne(teacherId);
      if (!teacher) {
        throw new ExcelDataNotFoundException(
          'Teacher',
          `${teacherName} (id: ${teacherId})`,
          n,
        );
      }

      const course = subject;
      const section = sections[0];
      const user = teacher;

      data.push(this.repository.create({ user, course, section }));
    }

    for (let d of data) {
      await this.repository.insert(d);
    }

    return HttpStatus.OK;
  }

  private sectionStringToObject(str: string) {
    const parts = str.split('-');
    const [program, section] = parts;
    const semester = section.substring(0, section.length - 1);
    const name = section[section.length - 1];
    return { program, semester, name };
  }
}
