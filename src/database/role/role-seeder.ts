import { RoleService } from '@api/role/role.service';
import { INestApplication } from '@nestjs/common';
import seed from '../helpers';
import * as roles from './roles.json';

export default async function seedRoles(app: INestApplication) {
  const svc = app.get(RoleService);
  await seed(svc, roles, 'role');
}
