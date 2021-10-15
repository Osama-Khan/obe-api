import { CourseEntity } from '@api/course/course.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity({ name: 'clo' })
export class CLOEntity extends ParentEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne((type) => CourseEntity, (course) => course.clos)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;
}
