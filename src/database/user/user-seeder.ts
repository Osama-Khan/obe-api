import { UserService } from '@api/user/user.service';
import { INestApplication } from '@nestjs/common';
import seed from '../helpers';
import * as users from './users.json';

export default async function seedUsers(app: INestApplication) {
  const svc = app.get(UserService);
  await seed(svc, users, 'user');
}
