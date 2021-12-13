import { PLOEntity } from '@api/objective/plo/plo.entity';
import { ProgramEntity } from '@api/program/program.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'program_plo' })
export class ProgramPloMapEntity extends ParentEntity {
  /** Serial number of the PLO wrt Program */
  @Column({ type: 'tinyint' })
  number: number;

  /** The PLO assigned to this Program */
  @ManyToOne((type) => PLOEntity, (plo) => plo.programMaps)
  @JoinColumn({ name: 'plo_id' })
  plo: PLOEntity;

  /** The Program containing this PLO */
  @ManyToOne((type) => ProgramEntity, (program) => program.ploMaps)
  @JoinColumn({ name: 'program_id' })
  program: ProgramEntity;
}
