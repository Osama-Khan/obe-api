import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { ActivityEntity } from '../activity.entity';

@Entity({ name: 'question' })
export class QuestionEntity extends ParentEntity {
  /** Name of the question */
  @Column()
  title: string;

  /** CLOs this question hits */
  @ManyToMany((type) => CLOEntity)
  @JoinTable({ name: 'question_clo' })
  clos: CLOEntity[];

  /** Activity this question is in */
  @ManyToOne((type) => ActivityEntity, (activity) => activity.questions)
  @JoinColumn({ name: 'activity_id' })
  activity: ActivityEntity;
}
