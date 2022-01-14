import { UserService } from '@api/user/user.service';
import { INestApplication } from '@nestjs/common';
import seed from '../helpers';
import * as basicUsers from './users.json';
import * as students from './students.json';

export default async function seedUsers(app: INestApplication) {
  const users = [
    ...basicUsers,
    students.map((s) => ({ ...s, role: 'student' })),
  ];
  const svc = app.get(UserService);
  await seed(svc, users, 'user');
}
