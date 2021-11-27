import { Controller, Inject } from '@nestjs/common';
import { CrudController } from '@shared/controllers/crud.controller';
import { ActivityTypeEntity } from './activity-type.entity';
import { ActivityTypeService } from './activity-type.service';

@Controller('activity-type')
export class ActivityTypeController extends CrudController<
  ActivityTypeEntity,
  ActivityTypeService
> {
  constructor(@Inject(ActivityTypeService) service: ActivityTypeService) {
    super(service);
  }
}
