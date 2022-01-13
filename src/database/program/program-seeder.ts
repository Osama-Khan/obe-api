import { ProgramService } from '@api/program/program.service';
import { INestApplication } from '@nestjs/common';
import seed from '../helpers';
import * as programs from './programs.json';

export default async function seedPrograms(app: INestApplication) {
  const svc = app.get(ProgramService);
  await seed(svc, programs, 'program');
}
