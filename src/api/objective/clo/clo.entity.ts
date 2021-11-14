import { CourseEntity } from '@api/course/course.entity';
import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectiveMapEntity } from '../map/map.entity';

@Entity({ name: 'clo' })
export class CLOEntity extends ParentEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany((type) => ObjectiveMapEntity, (obj) => obj.clo, {
    cascade: true,
  })
  maps: ObjectiveMapEntity[];

  @ManyToOne((type) => CourseEntity, (course) => course.clos)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;
}
