import { UserEntity } from '@api/user/user.entity';
import { ParentEntity } from '@shared/entity/ParentEntity';
import { Column, Entity, OneToMany } from 'typeorm';

type RoleType = 'admin' | 'teacher' | 'student';

@Entity({ name: 'role' })
export class RoleEntity extends ParentEntity {
  @Column()
  name: RoleType;

  @OneToMany((type) => UserEntity, (user) => user.role)
  users: UserEntity[];
}
