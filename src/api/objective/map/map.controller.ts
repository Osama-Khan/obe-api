import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Inject } from '@nestjs/common';
import { ObjectiveMapEntity } from './map.entity';
import { ObjectiveMapService } from './map.service';

@Controller('objective-map')
export class ObjectiveMapController extends CrudController<
  ObjectiveMapEntity,
  ObjectiveMapService
> {
  constructor(@Inject(ObjectiveMapService) service: ObjectiveMapService) {
    super(service);
  }
}
