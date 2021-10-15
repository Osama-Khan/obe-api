import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Inject } from '@nestjs/common';
import { PLOEntity } from './plo.entity';
import { PLOService } from './plo.service';

@Controller('plo')
export class PLOController extends CrudController<PLOEntity, PLOService> {
  constructor(@Inject(PLOService) service: PLOService) {
    super(service);
  }
}
