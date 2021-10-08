import { Body, Get, Param, Patch, Put, Delete } from '@nestjs/common';
import { ApiService } from '@shared/services/api.service';
import { DeepPartial } from 'typeorm';

/**
 * Controller containing general CRUD endpoints
 */
export abstract class CrudController<Entity, Service extends ApiService<Entity>> {
  /** 
   * @param service The ApiService of the given entity
   */
  constructor(private service: Service) {}

  /** Gets a list of entities */
  @Get()
  get() {
    return this.service.find();
  }

  /** Gets one entity matching the given id */
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.findOne(id);
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
}
