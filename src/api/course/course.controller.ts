import { CrudController } from '@shared/controllers/crud.controller';
import { Body, Controller, Inject, Post } from '@nestjs/common';
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

  @Post('allocation/upload')
  uploadAllocationFile(@Body() { file }) {
    this.service.applyAllocationFile(file);
  }
}
