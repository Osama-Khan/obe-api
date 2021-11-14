import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CLOEntity } from '../clo/clo.entity';
import { PLOEntity } from '../plo/plo.entity';

@Entity({ name: 'clo_plo' })
export class ObjectiveMapEntity extends ParentEntity {
  @Column()
  weight: number;

  @ManyToOne((type) => PLOEntity, (plo) => plo.maps)
  @JoinColumn({ name: 'plo_id' })
  plo: PLOEntity;

  @ManyToOne((type) => CLOEntity, (clo) => clo.maps)
  @JoinColumn({ name: 'clo_id' })
  clo: CLOEntity;
}
