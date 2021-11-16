import { PLOService } from '@api/objective/plo/plo.service';
import { INestApplication } from '@nestjs/common';
import seed from '../helpers';
import * as plos from './plos.json';

export default async function seedPlos(app: INestApplication) {
  const svc = app.get(PLOService);
  await seed(svc, plos, 'PLO');
}
