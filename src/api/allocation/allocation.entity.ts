import { AssessmentEntity } from '@api/assessment/assessment.entity';
import { CourseEntity } from '@api/course/course.entity';
import { SectionEntity } from '@api/section/section.entity';
import { UserEntity } from '@api/user/user.entity';
import { ParentEntity } from '@shared/entity/ParentEntity';
import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'allocation' })
export class AllocationEntity extends ParentEntity {
  /** ID of the section this allocation is for */
  @ManyToOne((type) => SectionEntity, (section) => section.allocations)
  @JoinColumn({
    name: 'section_id',
  })
  section: SectionEntity;

  /** ID of the user (teacher) teaching this section */
  @ManyToOne((type) => UserEntity, (user) => user.allocations)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  /** ID of the course taught by the teacher in this section */
  @ManyToOne((type) => CourseEntity, (course) => course.allocations)
  @JoinColumn({
    name: 'course_id',
  })
  course: CourseEntity;

  /** The assessments of this allocation */
  @OneToMany((type) => AssessmentEntity, (a) => a.type)
  assessments: AssessmentEntity[];
}
