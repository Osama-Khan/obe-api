import { ProgramEntity } from '@api/program/program.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class CourseEntity extends ParentEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  code: string;

  @ManyToMany((type) => ProgramEntity)
  programs: ProgramEntity[];
}
