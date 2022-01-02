import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Get, Inject, Param } from '@nestjs/common';
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

  /** Gets the maps for given program and course */
  @Get('program/:pid/course/:cid')
  getCourseMaps(@Param('pid') pid: string, @Param('cid') cid: string) {
    return this.service.getCourseMaps(pid, cid);
  }
}
