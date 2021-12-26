import { Body, Controller, Get, Inject, Param, Put } from '@nestjs/common';
import { CrudController } from '@shared/controllers/crud.controller';
import { ActivityEntity } from './activity.entity';
import { ActivityService } from './activity.service';

@Controller('activity')
export class ActivityController extends CrudController<
  ActivityEntity,
  ActivityService
> {
  constructor(@Inject(ActivityService) service: ActivityService) {
    super(service);
  }

  /** Gets CLOs with their cumulative weights in given section
   * @param sectionId ID of the section
   */
  @Get('maps/:id')
  getCloWeightsInSection(@Param('id') sectionId: string) {
    return this.service.getCloWeightsInSection(sectionId);
  }

  /** Gets number of activities grouped by types for given section
   * @param sectionId ID of the section
   */
  @Get('section-type-count/:id')
  getActivityTypeCounts(@Param('id') sectionId: string) {
    return this.service.getActivityTypeCounts(sectionId);
  }

  /** Sets evaluations for an activity */
  @Put(':id/evaluations')
  setEvaluations(@Param('id') id: string, @Body() data: any) {
    return this.service.setEvaluations(id, data);
  }
}
