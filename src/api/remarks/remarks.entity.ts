import { CourseEntity } from '@api/course/course.entity';
import { SectionEntity } from '@api/section/section.entity';
import { UserEntity } from '@api/user/user.entity';
import { ParentEntity } from '@shared/entity/ParentEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'remarks' })
export class RemarksEntity extends ParentEntity {
  @ManyToOne((type) => UserEntity, (u) => u.remarks)
  @JoinColumn({ name: 'student_id' })
  student: UserEntity;

  @ManyToOne((type) => UserEntity)
  @JoinColumn({ name: 'teacher_id' })
  teacher: UserEntity;

  @ManyToOne((type) => SectionEntity)
  @JoinColumn({ name: 'section_id' })
  section: SectionEntity;

  @ManyToOne((type) => CourseEntity)
  @JoinColumn({ name: 'course_id' })
  course: CourseEntity;

  @Column({ type: 'text' })
  text: string;
}
