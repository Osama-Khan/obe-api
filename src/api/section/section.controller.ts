import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Inject } from '@nestjs/common';
import { SectionEntity } from './section.entity';
import { SectionService } from './section.service';

@Controller('section')
export class SectionController extends CrudController<
  SectionEntity,
  SectionService
> {
  constructor(@Inject(SectionService) service: SectionService) {
    super(service);
  }
}
