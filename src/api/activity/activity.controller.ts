import { Controller, Inject } from '@nestjs/common';
import { CrudController } from '@shared/controllers/crud.controller';
import { ActivityEntity } from './activity.entity';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController extends CrudController<
  ActivityEntity,
  ActivityService
> {
  constructor(@Inject(ActivityService) service: ActivityService) {
    super(service);
  }
}
