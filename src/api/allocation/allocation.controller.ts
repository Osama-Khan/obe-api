import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Inject } from '@nestjs/common';
import { AllocationEntity } from './allocation.entity';
import { AllocationService } from './allocation.service';

@Controller('allocation')
export class AllocationController extends CrudController<
  AllocationEntity,
  AllocationService
> {
  constructor(@Inject(AllocationService) service: AllocationService) {
    super(service);
  }
}
