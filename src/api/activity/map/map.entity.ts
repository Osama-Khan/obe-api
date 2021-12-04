import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ActivityEntity } from '../activity.entity';

@Entity({ name: 'activity_clo' })
export class ActivityMapEntity extends ParentEntity {
  /** Percentage indicating how much of the CLO the activity fulfills */
  @Column({ type: 'tinyint' })
  weight: number;

  /** The activity assigned to the CLO */
  @ManyToOne((type) => ActivityEntity, (activity) => activity.maps)
  @JoinColumn({ name: 'activity_id' })
  activity: ActivityEntity;

  /** The CLO object mapped by the activity */
  @ManyToOne((type) => CLOEntity, (clo) => clo.activityMaps)
  @JoinColumn({ name: 'clo_id' })
  clo: CLOEntity;
}
