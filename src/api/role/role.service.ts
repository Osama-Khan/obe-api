import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService extends ApiService<RoleEntity> {
  constructor(
    @InjectRepository(RoleEntity) repository: Repository<RoleEntity>,
  ) {
    super(repository);
  }
}
