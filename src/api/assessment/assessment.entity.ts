import { ActivityTypeEntity } from '@api/activity/type/activity-type.entity';
import { AllocationEntity } from '@api/allocation/allocation.entity';
import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ParentEntity } from '@shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'assessment' })
export class AssessmentEntity extends ParentEntity {
  /** The Allocation this assessment is for */
  @ManyToOne((type) => AllocationEntity)
  @JoinColumn({
    name: 'allocation_id',
  })
  allocation: AllocationEntity;

  /** The activity type this assessment is for */
  @ManyToOne((type) => ActivityTypeEntity)
  @JoinColumn({
    name: 'type_id',
  })
  type: ActivityTypeEntity;

  /** Weight of the activity type on the CLO */
  @Column({ type: 'tinyint' })
  weight: number;

  /** The CLO hit by the activity type allocation */
  @ManyToOne((type) => CLOEntity)
  @JoinColumn({
    name: 'clo_id',
  })
  clo: CLOEntity;
}
