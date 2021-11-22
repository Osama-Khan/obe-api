import { UserEntity } from '@api/user/user.entity';
import { ParentEntity } from '@shared/entity/ParentEntity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'role' })
export class RoleEntity extends ParentEntity {
  /** Name of the role */
  @Column()
  name: string;

  /** Users of this role */
  @OneToMany((type) => UserEntity, (user) => user.role)
  users: UserEntity[];
}
