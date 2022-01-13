import { CourseService } from '@api/course/course.service';
import { INestApplication } from '@nestjs/common';
import seed from '../helpers';
import * as courses from './courses.json';

export default async function seedCourses(app: INestApplication) {
  const svc = app.get(CourseService);
  await seed(svc, courses, 'course');
}
