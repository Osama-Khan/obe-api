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
  @Column()
  name: string;

  @Column()
  semester: number;

  @ManyToOne((type) => ProgramEntity, (program) => program.sections)
  @JoinColumn({ name: 'program_id' })
  program: ProgramEntity;

  @ManyToMany((type) => UserEntity, (user) => user.sections)
  @JoinTable({
    name: 'user_section',
    joinColumn: { name: 'section_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: UserEntity[];

  @OneToMany((type) => AllocationEntity, (allocation) => allocation.section)
  allocations: AllocationEntity[];
}
