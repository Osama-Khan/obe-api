import { ActivityEntity } from '@api/activity/activity.entity';
import { AllocationEntity } from '@api/allocation/allocation.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { UserEntity } from '@api/user/user.entity';
import { ParentEntity } from '@shared/entity/ParentEntity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'section' })
export class SectionEntity extends ParentEntity {
  /** The name of the section. This is often a letter like "A" or "C".
   * For example, in BSCS-8B, B is the name of the section.
   */
  @Column()
  name: string;

  /** The semester of this section */
  @Column()
  semester: number;

  /** The program this section belongs to */
  @ManyToOne((type) => ProgramEntity, (program) => program.sections)
  @JoinColumn({ name: 'program_id' })
  program: ProgramEntity;

  /** The users (students) present in this section */
  @ManyToMany((type) => UserEntity, (user) => user.sections)
  @JoinTable({
    name: 'user_section',
    joinColumn: { name: 'section_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: UserEntity[];

  /** The allocations where this section is present */
  @OneToMany((type) => AllocationEntity, (allocation) => allocation.section)
  allocations: AllocationEntity[];

  /** The activities assigned to this section */
  @OneToMany((type) => ActivityEntity, (activity) => activity.section)
  activities: ActivityEntity[];
}
