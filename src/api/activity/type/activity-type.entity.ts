import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, OneToMany } from 'typeorm';
import { ActivityEntity } from '../activity.entity';

@Entity({ name: 'activity_type' })
export class ActivityTypeEntity extends ParentEntity {
  /** Name of the activity type */
  @Column()
  name: string;

  /** The activities that are of this type */
  @OneToMany((type) => ActivityEntity, (a) => a.type)
  activities: ActivityEntity[];
}
