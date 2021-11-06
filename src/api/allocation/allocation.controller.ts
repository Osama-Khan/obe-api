import { CrudController } from '@shared/controllers/crud.controller';
import { Body, Controller, Inject, Post } from '@nestjs/common';
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

  @Post('upload')
  uploadAllocationFile(@Body() { file }) {
    return this.service.applyAllocationFile(file);
  }
}
