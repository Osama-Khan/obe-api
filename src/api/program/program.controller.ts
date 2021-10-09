import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Inject } from '@nestjs/common';
import { ProgramEntity } from './program.entity';
import { ProgramService } from './program.service';

@Controller('program')
export class ProgramController extends CrudController<
  ProgramEntity,
  ProgramService
> {
  constructor(@Inject(ProgramService) service: ProgramService) {
    super(service);
  }
}
