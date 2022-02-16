import { ParentEntity } from 'src/shared/entity/ParentEntity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from '@api/role/role.entity';
import { SectionEntity } from '@api/section/section.entity';
import { AllocationEntity } from '@api/allocation/allocation.entity';
import { EvaluationEntity } from '@api/activity/evaluation/evaluation.entity';
import { RemarksEntity } from '@api/remarks/remarks.entity';

@Entity({ name: 'user' })
export class UserEntity extends ParentEntity {
  /** Username of the user */
  @Column({ unique: true })
  username: string;

  /** Email of the user */
  @Column({ unique: true })
  email: string;

  /** Password of the user */
  @Column()
  password: string;

  /** Date of birth of the user */
  @Column({ name: 'date_of_birth' })
  dateOfBirth: Date;

  /** Role of the user */
  @ManyToOne((type) => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  /** Sections the user (student) studies in */
  @ManyToMany((type) => SectionEntity, (section) => section.users)
  @JoinTable({
    name: 'user_section',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'section_id' },
  })
  sections: SectionEntity[];

  /** Allocations of the user (teacher) to different sections */
  @OneToMany((type) => AllocationEntity, (allocation) => allocation.user)
  allocations: AllocationEntity[];

  /** Evaluations of the user */
  @OneToMany((type) => EvaluationEntity, (evaluation) => evaluation.user)
  evaluations: EvaluationEntity[];

  @OneToMany((type) => RemarksEntity, (r) => r.student)
  remarks: RemarksEntity[];

  /** Encryption method for password before insertion */
  @BeforeInsert()
  async encryptPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 5);
    }
  }
}
