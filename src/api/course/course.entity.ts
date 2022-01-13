import { AllocationEntity } from '@api/allocation/allocation.entity';
import { AssessmentEntity } from '@api/assessment/assessment.entity';
import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'course' })
export class CourseEntity extends ParentEntity {
  /** Title of the course */
  @Column()
  title: string;

  /** Credit hours of the course */
  @Column({ name: 'credit_hours', type: 'tinyint' })
  creditHours: number;

  /** The programs this course is present in */
  @ManyToMany((type) => ProgramEntity, (program) => program.courses)
  @JoinTable({
    name: 'program_course',
    joinColumn: { name: 'course_id' },
    inverseJoinColumn: { name: 'program_id' },
  })
  programs: ProgramEntity[];

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
