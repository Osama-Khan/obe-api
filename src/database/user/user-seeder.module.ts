import { RoleEntity } from '@api/role/role.entity';
import { UserEntity } from '@api/user/user.entity';
import { UserService } from '@api/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  providers: [UserService],
})
export class UserSeederModule {}
