import { ProgramEntity } from '@api/program/program.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { ObjectiveMapEntity } from '../map/map.entity';

@Entity({ name: 'plo' })
export class PLOEntity extends ParentEntity {
  /** Title of the PLO */
  @Column()
  title: string;

  /** Description of the PLO */
  @Column({ type: 'text' })
  description: string;

  /** Maps of this PLO with CLOs along with their weights */
  @OneToMany((type) => ObjectiveMapEntity, (obj) => obj.plo)
  maps: ObjectiveMapEntity[];

  /** Programs that hit this PLO */
  @ManyToMany((type) => ProgramEntity, (program) => program.plos)
  @JoinTable({
    name: 'program_plo',
    joinColumn: { name: 'plo_id' },
    inverseJoinColumn: { name: 'program_id' },
  })
  programs: ProgramEntity[];
}
