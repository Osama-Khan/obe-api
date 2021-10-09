import { CourseEntity } from '@api/course/course.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class ProgramEntity extends ParentEntity {
  @Column()
  title: string;

  @ManyToMany((type) => CourseEntity)
  @JoinTable({ name: 'program_course' })
  courses: CourseEntity[];
}
