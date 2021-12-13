import { CourseEntity } from '@api/course/course.entity';
import { ProgramPloMapEntity } from '@api/maps/program-plo/map.entity';
import { SectionEntity } from '@api/section/section.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'program' })
export class ProgramEntity extends ParentEntity {
  /** Name of the Program */
  @Column()
  title: string;

  /** The courses that this program includes */
  @ManyToMany((type) => CourseEntity)
  @JoinTable({
    name: 'program_course',
    joinColumn: { name: 'program_id' },
    inverseJoinColumn: { name: 'course_id' },
  })
  courses: CourseEntity[];

  /** Maps containing the PLOs this program hits */
  @OneToMany((type) => ProgramPloMapEntity, (map) => map.program)
  ploMaps: ProgramPloMapEntity[];

  /** The sections that offer this program */
  @OneToMany((type) => SectionEntity, (section) => section.program)
  sections: SectionEntity[];
}
