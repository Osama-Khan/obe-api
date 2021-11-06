import { CourseEntity } from '@api/course/course.entity';
import { SectionEntity } from '@api/section/section.entity';
import { UserEntity } from '@api/user/user.entity';
import { ParentEntity } from '@shared/entity/ParentEntity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'allocation' })
export class AllocationEntity extends ParentEntity {
  @ManyToOne((type) => SectionEntity, (section) => section.allocations)
  @JoinColumn({
    name: 'section_id',
  })
  section: SectionEntity;

  @ManyToOne((type) => UserEntity, (user) => user.allocations)
  @JoinColumn({
    name: 'user_id',
  })
  user: UserEntity;

  @ManyToOne((type) => CourseEntity, (course) => course.allocations)
  @JoinColumn({
    name: 'course_id',
  })
  course: CourseEntity;
}
