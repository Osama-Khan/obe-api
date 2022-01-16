import { AllocationEntity } from '@api/allocation/allocation.entity';
import { AssessmentEntity } from '@api/assessment/assessment.entity';
import { CLOEntity } from '@api/objective/clo/clo.entity';
import { PLOEntity } from '@api/objective/plo/plo.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'course' })
export class CourseEntity extends ParentEntity {
  /** Title of the course */
  @Column()
  title: string;

  /** Short title of the course */
  @Column({ name: 'title_short' })
  titleShort: string;

  /** Theory credit hours of the course */
  @Column({ name: 'theory_hours', type: 'tinyint' })
  theoryHours: number;

  /** Lab credit hours of the course (1/2 contribution to total credit hours) */
  @Column({ name: 'lab_hours', type: 'tinyint' })
  labHours: number;

  /** Determines if the course is elective */
  @Column({ name: 'is_elective', type: 'boolean' })
  isElective: boolean;

  /** The programs this course is present in */
  @ManyToMany((type) => ProgramEntity, (program) => program.courses)
  @JoinTable({
    name: 'program_course',
    joinColumn: { name: 'course_id' },
    inverseJoinColumn: { name: 'program_id' },
  })
  programs: ProgramEntity[];

  /** The plos abstractly mapped to this course */
  @ManyToMany((type) => PLOEntity, (plo) => plo.courses)
  @JoinTable({
    name: 'abstract_mapping',
    joinColumn: { name: 'course_id' },
    inverseJoinColumn: { name: 'plo_id' },
  })
  plos: PLOEntity[];

  /** The clos that this course fulfills */
  @OneToMany((type) => CLOEntity, (clo) => clo.course)
  clos: CLOEntity[];

  /** Allocations this course is assigned in */
  @OneToMany((type) => AllocationEntity, (allocation) => allocation.course)
  allocations: AllocationEntity[];

  /** The assessments of this course */
  @OneToMany((type) => AssessmentEntity, (a) => a.course)
  assessments: AssessmentEntity[];
}
