import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { PLOEntity } from './plo.entity';
import { PLOService } from './plo.service';

@Controller('plo')
export class PLOController extends CrudController<PLOEntity, PLOService> {
  constructor(@Inject(PLOService) service: PLOService) {
    super(service);
  }

  /** Gets the CLO mappings of a PLO */
  @Get(':id/mappings')
  getMappings(@Param('id') id: string) {
    return this.service.getMappings(id);
  }
}
