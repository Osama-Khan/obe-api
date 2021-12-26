import { UserEntity } from '@api/user/user.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ActivityEntity } from '../activity.entity';

@Entity({ name: 'evaluation' })
export class EvaluationEntity extends ParentEntity {
  /** Obtained Marks */
  @Column()
  marks: number;

  /** Activity this evaluation is for */
  @ManyToOne((type) => ActivityEntity, (activity) => activity.evaluations)
  @JoinColumn({ name: 'activity_id' })
  activity: ActivityEntity;

  /** Student this evaluation belongs to */
  @ManyToOne((type) => UserEntity, (user) => user.evaluations)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
