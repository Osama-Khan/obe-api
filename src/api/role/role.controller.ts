import { Controller, Inject } from '@nestjs/common';
import { CrudController } from '@shared/controllers/crud.controller';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController extends CrudController<RoleEntity, RoleService> {
  constructor(@Inject(RoleService) service: RoleService) {
    super(service);
  }
}
