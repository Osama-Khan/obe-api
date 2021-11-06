import { ProgramEntity } from '@api/program/program.entity';
import { UserEntity } from '@api/user/user.entity';
import { ParentEntity } from '@shared/entity/ParentEntity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'section' })
export class SectionEntity extends ParentEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  semester: number;

  @ManyToMany((type) => ProgramEntity, (program) => program.sections)
  @JoinTable({
    name: 'section_program',
    joinColumn: { name: 'section_id' },
    inverseJoinColumn: { name: 'program_id' },
  })
  programs: ProgramEntity[];

  @ManyToMany((type) => UserEntity, (user) => user.sections)
  @JoinTable({
    name: 'user_section',
    joinColumn: { name: 'section_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: UserEntity[];
}
