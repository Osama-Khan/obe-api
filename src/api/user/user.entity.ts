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

@Entity({ name: 'user' })
export class UserEntity extends ParentEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'date_of_birth' })
  dateOfBirth: Date;

  @ManyToOne((type) => RoleEntity, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @ManyToMany((type) => SectionEntity, (section) => section.users)
  @JoinTable({
    name: 'user_section',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'section_id' },
  })
  sections: SectionEntity[];

  @OneToMany((type) => AllocationEntity, (allocation) => allocation.user)
  allocations: AllocationEntity[];

  @BeforeInsert()
  async encryptPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 5);
    }
  }
}
