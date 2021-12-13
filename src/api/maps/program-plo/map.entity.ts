import { PLOEntity } from '@api/objective/plo/plo.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'program_plo' })
export class ProgramPloMapEntity extends ParentEntity {
  /** Serial number of the PLO wrt Program */
  @Column({ type: 'tinyint' })
  number: number;
}
