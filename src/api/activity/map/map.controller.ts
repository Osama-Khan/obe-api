import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Inject } from '@nestjs/common';
import { ActivityMapEntity } from './map.entity';
import { ActivityMapService } from './map.service';

@Controller('activity-map')
export class ActivityMapController extends CrudController<
  ActivityMapEntity,
  ActivityMapService
> {
  constructor(@Inject(ActivityMapService) service: ActivityMapService) {
    super(service);
  }
}
