import { Body, Param, Patch, Put, Delete, Post } from '@nestjs/common';
import CriteriaValidationPipe from '@shared/pipes/criteria-validation.pipe';
import { ApiService } from '@shared/services/api.service';
import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';

/**
 * Controller containing general CRUD endpoints
 */
export abstract class CrudController<
  Entity,
  Service extends ApiService<Entity>
> {
  /**
   * @param service The ApiService of the given entity
   */
  constructor(protected service: Service) {}

  /** Gets a list of entities */
  @Post()
  get(@Body(new CriteriaValidationPipe()) criteria?: FindManyOptions<Entity>) {
    return this.service.find(criteria);
  }

  /** Gets one entity matching the given id */
  @Post(':id')
  getOne(
    @Param('id') id: string,
    @Body(new CriteriaValidationPipe()) criteria?: FindOneOptions<Entity>,
  ) {
    return this.service.findOne(id, criteria);
  }

  /** Inserts an entity */
  @Put()
  insert(@Body() data: DeepPartial<Entity>) {
    return this.service.insert(data);
  }

  /** Patches the entity with the given ID */
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: DeepPartial<Entity>) {
    return this.service.update(id, data);
  }

  /** Deletes the entity with the given ID */
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.remove(id);
  }

  /** Gets count of entities matching the given criteria */
  @Post('meta/count')
  getCount(
    @Body(new CriteriaValidationPipe()) criteria?: FindManyOptions<Entity>,
  ) {
    return this.service.count(criteria);
  }
}
