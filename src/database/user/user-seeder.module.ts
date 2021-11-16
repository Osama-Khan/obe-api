import { RoleEntity } from '@api/role/role.entity';
import { RoleService } from '@api/role/role.service';
import { UserEntity } from '@api/user/user.entity';
import { UserService } from '@api/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  providers: [UserService, RoleService],
})
export class UserSeederModule {}
