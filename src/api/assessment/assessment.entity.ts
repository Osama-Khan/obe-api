import { ActivityTypeEntity } from '@api/activity/type/activity-type.entity';
import { CourseEntity } from '@api/course/course.entity';
import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ParentEntity } from '@shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'assessment' })
export class AssessmentEntity extends ParentEntity {
  /** The Course this assessment is for */
  @ManyToOne((type) => CourseEntity, (course) => course.assessments)
  @JoinColumn({
    name: 'course_id',
  })
  course: CourseEntity;

  /** The activity type this assessment is for */
  @ManyToOne((type) => ActivityTypeEntity, (type) => type.assessments)
  @JoinColumn({
    name: 'type_id',
  })
  type: ActivityTypeEntity;

  /** Weight of the activity type on the CLO */
  @Column({ type: 'tinyint' })
  weight: number;

  /** The CLO hit by the activity type allocation */
  @ManyToOne((type) => CLOEntity, (clo) => clo.assessments)
  @JoinColumn({
    name: 'clo_id',
  })
  clo: CLOEntity;
}
