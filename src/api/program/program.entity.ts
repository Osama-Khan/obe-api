import { CourseEntity } from '@api/course/course.entity';
import { PLOEntity } from '@api/objective/plo/plo.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'program' })
export class ProgramEntity extends ParentEntity {
  @Column()
  title: string;

  @ManyToMany((type) => CourseEntity)
  @JoinTable({
    name: 'program_course',
    joinColumn: { name: 'program_id' },
    inverseJoinColumn: { name: 'course_id' },
  })
  courses: CourseEntity[];

  @OneToMany((type) => PLOEntity, (plo) => plo.program)
  plos: PLOEntity[];
}
