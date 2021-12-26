import { SectionEntity } from '@api/section/section.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { EvaluationEntity } from './evaluation/evaluation.entity';
import { ActivityMapEntity } from './map/map.entity';
import { ActivityTypeEntity } from './type/activity-type.entity';

@Entity({ name: 'activity' })
export class ActivityEntity extends ParentEntity {
  /** Title of the activity */
  @Column()
  title: string;

  /** A bit longer description of the activity */
  @Column({ type: 'text', nullable: true })
  description: string;

  /** Total marks obtainable in the activity */
  @Column({ type: 'smallint' })
  marks: number;

  /** Type of the activity */
  @ManyToOne((type) => ActivityTypeEntity, (at) => at.activities)
  @JoinColumn({ name: 'type_id' })
  type: ActivityTypeEntity;

  /** Maps of this Activity with CLOs along with weights */
  @OneToMany((type) => ActivityMapEntity, (obj) => obj.activity, {
    cascade: true,
  })
  maps: ActivityMapEntity[];

  /** Evaluations of the activity */
  @OneToMany((type) => EvaluationEntity, (evaluation) => evaluation.activity)
  evaluations: EvaluationEntity[];

  /** The section this activity has been assigned to */
  @ManyToOne((type) => SectionEntity, (sec) => sec.activities)
  @JoinColumn({ name: 'section_id' })
  section: SectionEntity;
}
