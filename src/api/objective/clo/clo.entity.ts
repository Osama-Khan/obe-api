import { CourseEntity } from '@api/course/course.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectiveMapEntity } from '../map/map.entity';

@Entity({ name: 'clo' })
export class CLOEntity extends ParentEntity {
  /** Title of the CLO */
  @Column()
  title: string;

  /** Description of the CLO */
  @Column({ type: 'text' })
  description: string;

  /** Maps of this CLO with PLOs along with weights */
  @OneToMany((type) => ObjectiveMapEntity, (obj) => obj.clo, {
    cascade: true,
  })
  maps: ObjectiveMapEntity[];

  /** Course that this CLO belongs to */
  @ManyToOne((type) => CourseEntity, (course) => course.clos)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;
}
