import { ParentEntity } from 'src/shared/entity/ParentEntity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends ParentEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'date_of_birth' })
  dateOfBirth: Date;
}
