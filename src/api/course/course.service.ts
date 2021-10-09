import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { CourseEntity } from './course.entity';

@Injectable()
export class CourseService extends ApiService<CourseEntity> {
  constructor(
    @InjectRepository(CourseEntity) repository: Repository<CourseEntity>,
  ) {
    super(repository);
  }
}
