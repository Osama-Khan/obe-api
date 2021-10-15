import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RoleEntity } from '@api/role/role.entity';

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

  @BeforeInsert()
  async encryptPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 5);
    }
  }
}
