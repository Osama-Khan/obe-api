import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Inject } from '@nestjs/common';
import { AssessmentEntity } from './assessment.entity';
import { AssessmentService } from './assessment.service';

@Controller('assessment')
export class AssessmentController extends CrudController<
  AssessmentEntity,
  AssessmentService
> {
  constructor(@Inject(AssessmentService) service: AssessmentService) {
    super(service);
  }
}
