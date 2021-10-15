import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'course' })
export class CourseEntity extends ParentEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  code: string;

  @ManyToMany((type) => ProgramEntity, (program) => program.courses)
  programs: ProgramEntity[];

  @OneToMany((type) => CLOEntity, (clo) => clo.course)
  clos: CLOEntity[];
}
