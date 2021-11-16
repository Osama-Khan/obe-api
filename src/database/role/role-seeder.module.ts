import { RoleEntity } from '@api/role/role.entity';
import { RoleService } from '@api/role/role.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [RoleService],
})
export class RoleSeederModule {}
