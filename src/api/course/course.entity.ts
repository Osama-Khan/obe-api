import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'course' })
export class CourseEntity extends ParentEntity {
  @Column()
  title: string;

  @Column({ unique: true })
  code: string;

  @Column({ name: 'credit_hours', type: 'tinyint' })
  creditHours: number;

  @ManyToMany((type) => ProgramEntity, (program) => program.courses)
  @JoinTable({
    name: 'program_course',
    joinColumn: { name: 'course_id' },
    inverseJoinColumn: { name: 'program_id' },
  })
  programs: ProgramEntity[];

  @OneToMany((type) => CLOEntity, (clo) => clo.course)
  clos: CLOEntity[];
}
