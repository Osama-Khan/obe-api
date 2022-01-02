import { ProgramEntity } from '@api/program/program.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CLOEntity } from '../clo/clo.entity';
import { PLOEntity } from '../plo/plo.entity';

@Entity({ name: 'clo_plo' })
export class ObjectiveMapEntity extends ParentEntity {
  /** Percentage indicating how much of the PLO this CLO fulfills */
  @Column({ type: 'tinyint' })
  weight: number;

  /** The PLO object assigned to this CLO */
  @ManyToOne((type) => PLOEntity, (plo) => plo.maps)
  @JoinColumn({ name: 'plo_id' })
  plo: PLOEntity;

  /** The CLO object mapped to this PLO */
  @ManyToOne((type) => CLOEntity, (clo) => clo.maps)
  @JoinColumn({ name: 'clo_id' })
  clo: CLOEntity;

  /** The program this mapping is relevant to */
  @ManyToOne((type) => ProgramEntity)
  @JoinColumn({ name: 'program_id' })
  program: ProgramEntity;
}
