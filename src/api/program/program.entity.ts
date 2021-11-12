import { CourseEntity } from '@api/course/course.entity';
import { PLOEntity } from '@api/objective/plo/plo.entity';
import { SectionEntity } from '@api/section/section.entity';
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

  @ManyToMany((type) => PLOEntity, (plo) => plo.programs)
  @JoinTable({
    name: 'program_plo',
    joinColumn: { name: 'program_id' },
    inverseJoinColumn: { name: 'plo_id' },
  })
  plos: PLOEntity[];

  @OneToMany((type) => SectionEntity, (section) => section.program)
  @JoinTable({
    name: 'section_program',
    joinColumn: { name: 'program_id' },
    inverseJoinColumn: { name: 'section_id' },
  })
  sections: SectionEntity[];
}
