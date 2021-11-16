import { RoleService } from '@api/role/role.service';
import { UserService } from '@api/user/user.service';
import { INestApplication } from '@nestjs/common';
import { LogHelper } from '@shared/helpers';
import seed from '../helpers';
import * as users from './users.json';

export default async function seedUsers(app: INestApplication) {
  const svc = app.get(UserService);
  const rsvc = app.get(RoleService);
  const roleUsers = [];
  for (const u of users) {
    const roles = await rsvc.find({ where: { name: u.role } });
    if (roles.length === 0) {
      LogHelper.error(`No such role "${u.role}"`);
      throw new Error(
        `The role "${u.role}" was not found. Please make sure the role name is correct in users seed file and that roles are seeded before users.`,
      );
    }
    roleUsers.push({ ...u, role: { id: roles[0].id } });
  }
  await seed(svc, roleUsers, 'user');
}
