import { CrudController } from '@shared/controllers/crud.controller';
import { Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { CourseEntity } from './course.entity';
import { CourseService } from './course.service';

@Controller('course')
export class CourseController extends CrudController<
  CourseEntity,
  CourseService
> {
  constructor(@Inject(CourseService) service: CourseService) {
    super(service);
  }

  /** Gets list of courses with booleans representing if attention is required */
  @Get('with-actions/:id')
  getWithActions(@Param('id') programId: string) {
    return this.service.getWithActions(programId);
  }

  @Put(':id/abstract-mapping')
  addAbstractMapping(@Param('id') id: string, @Body() plos: string[]) {
    return this.service.addAbstractMapping(id, plos);
  }
}
