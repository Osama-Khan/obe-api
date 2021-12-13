import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Inject } from '@nestjs/common';
import { ProgramPloMapEntity } from './map.entity';
import { ProgramPloMapService } from './map.service';

@Controller('program-plo-map')
export class ProgramPloMapController extends CrudController<
  ProgramPloMapEntity,
  ProgramPloMapService
> {
  constructor(@Inject(ProgramPloMapService) service: ProgramPloMapService) {
    super(service);
  }
}
