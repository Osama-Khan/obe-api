import { ActivityTypeService } from '@api/activity/type/activity-type.service';
import { INestApplication } from '@nestjs/common';
import seed from '../helpers';
import * as activityTypes from './activity-types.json';

export default async function seedActivityTypes(app: INestApplication) {
  const svc = app.get(ActivityTypeService);
  await seed(svc, activityTypes, 'Activity Type');
}
