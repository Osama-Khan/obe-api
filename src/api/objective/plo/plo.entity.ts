import { ProgramEntity } from '@api/program/program.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { CLOEntity } from '../clo/clo.entity';

@Entity({ name: 'plo' })
export class PLOEntity extends ParentEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany((type) => CLOEntity, (clo) => clo.plos)
  @JoinTable({
    name: 'plo_clo',
    joinColumn: { name: 'plo_id' },
    inverseJoinColumn: { name: 'clo_id' },
  })
  clos: CLOEntity[];

  @ManyToMany((type) => ProgramEntity, (program) => program.plos)
  @JoinTable({
    name: 'program_plo',
    joinColumn: { name: 'plo_id' },
    inverseJoinColumn: { name: 'program_id' },
  })
  programs: ProgramEntity[];
}
