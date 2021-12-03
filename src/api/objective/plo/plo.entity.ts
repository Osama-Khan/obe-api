import { ProgramEntity } from '@api/program/program.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { ObjectiveMapEntity } from '../map/map.entity';

@Entity({ name: 'plo' })
export class PLOEntity extends ParentEntity {
  /** Number of the PLO displayed as a unique id. e.g. PLO1 */
  @Column({ type: 'tinyint', unique: true })
  number: number;

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
  programs: ProgramEntity[];
}
