import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CLOEntity } from '../clo/clo.entity';
import { PLOEntity } from '../plo/plo.entity';

@Entity({ name: 'clo_plo' })
export class ObjectiveMapEntity extends ParentEntity {
  @Column()
  weight: number;
}
