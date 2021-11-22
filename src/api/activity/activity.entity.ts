import { SectionEntity } from '@api/section/section.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ActivityTypeEntity } from './type/activity-type.entity';

@Entity({ name: 'activity' })
export class ActivityEntity extends ParentEntity {
  /** Title of the activity */
  @Column()
  title: string;

  /** A bit longer description of the activity */
  @Column({ type: 'text', nullable: true })
  description: string;

  /** Type of the activity */
  @ManyToOne((type) => ActivityTypeEntity, (at) => at.activities)
  @JoinColumn({ name: 'type_id' })
  type: ActivityTypeEntity;

  /** The section this activity has been assigned to */
  @ManyToOne((type) => SectionEntity, (sec) => sec.activities)
  @JoinColumn({ name: 'section_id' })
  section: SectionEntity;
}
