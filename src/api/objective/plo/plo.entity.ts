import { CourseEntity } from '@api/course/course.entity';
import { ProgramPloMapEntity } from '@api/maps/program-plo/map.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { ObjectiveMapEntity } from '../map/map.entity';

@Entity({ name: 'plo' })
export class PLOEntity extends ParentEntity {
  /** Title of the PLO */
  @Column()
  title: string;

  /** Description of the PLO */
  @Column({ type: 'text' })
  description: string;

  /** Percentage required to pass this PLO */
  @Column({ type: 'tinyint' })
  passing: number;

  /** Maps of this PLO with CLOs along with their weights */
  @OneToMany((type) => ObjectiveMapEntity, (obj) => obj.plo)
  maps: ObjectiveMapEntity[];

  /** Maps containing programs that hit this PLO */
  @OneToMany((type) => ProgramPloMapEntity, (map) => map.plo)
  programMaps: ProgramPloMapEntity[];

  /** The courses abstractly mapped to this PLO */
  @ManyToMany((type) => CourseEntity, (course) => course.plos)
  courses: CourseEntity[];
}
