import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Inject } from '@nestjs/common';
import { CLOEntity } from './clo.entity';
import { CLOService } from './clo.service';

@Controller('clo')
export class CLOController extends CrudController<CLOEntity, CLOService> {
  constructor(@Inject(CLOService) service: CLOService) {
    super(service);
  }
}
