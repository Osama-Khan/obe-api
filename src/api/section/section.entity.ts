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
}
