import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ActivityTypeEntity } from './type/activity-type.entity';

@Entity({ name: 'activity' })
export class ActivityEntity extends ParentEntity {
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @ManyToOne((type) => ActivityTypeEntity, (at) => at.activities)
  @JoinColumn({ name: 'type_id' })
  type: ActivityTypeEntity;
}
