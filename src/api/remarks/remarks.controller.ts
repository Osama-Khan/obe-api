import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Inject } from '@nestjs/common';
import { RemarksEntity } from './remarks.entity';
import { RemarksService } from './remarks.service';

@Controller('remarks')
export class RemarksController extends CrudController<
  RemarksEntity,
  RemarksService
> {
  constructor(@Inject(RemarksService) service: RemarksService) {
    super(service);
  }
}
