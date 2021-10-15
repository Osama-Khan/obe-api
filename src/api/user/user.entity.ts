import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { BeforeInsert, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';

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

  @Column({ type: 'boolean', default: false })
  isAdmin: boolean;

  @BeforeInsert()
  async encryptPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 5);
    }
  }
}
