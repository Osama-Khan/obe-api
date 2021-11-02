import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Workbook } from 'exceljs';
import { Repository } from 'typeorm';
import { CourseEntity } from './course.entity';

@Injectable()
export class CourseService extends ApiService<CourseEntity> {
  constructor(
    @InjectRepository(CourseEntity) repository: Repository<CourseEntity>,
  ) {
    super(repository);
  }

  /** Receives b64 encoded xlsx file and applies allocation
   * data to database
   */
  async applyAllocationFile(b64: string) {
    const buffer = Buffer.from(b64, 'base64');
    const book = await new Workbook().xlsx.load(buffer);
    console.log('####### UPLOADED FILE #######');
    book.worksheets[0].eachRow((r, n) => {
      console.log('Cell #' + n);
      const subjectCode = r.getCell(1).value;
      const section = r.getCell(2).value;
      const teacher = r.getCell(3).value;

      console.log({ subjectCode, section, teacher });
    });
    console.log('#############################');
  }
}
