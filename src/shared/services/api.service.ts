import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';

/**
 * Service containing the general operations of an API service
 */
export abstract class ApiService<Entity> {
  /** @param repository Repository used for database operations.*/
  constructor(protected repository: Repository<Entity>) {}

  /**
   * Finds entities that match the given criteria
   * @param criteria Criteria to filter entities
   * @returns A promise that resolves to an array of entities
   */
  async find(criteria?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repository.find(criteria);
  }

  /**
   * Gets an entity with given id
   * @param conditions Conditions for the entity
   * @param criteria The criteria to filter entities
   * @returns A promise that resolves to the `Entity` with given id
   */
  async findOne(
    conditions: FindConditions<Entity>,
    criteria?: FindOneOptions<Entity>,
  ): Promise<Entity> {
    return this.repository.findOne(conditions, criteria);
  }

  /**
   * Removes an entity from the database
   * @param id The id of entity to delete
   * @returns A promise that resolves to the `Entity` removed
   */
  async remove(id: string): Promise<Entity> {
    const e = await this.findOne(id);
    if (!e) throw new NotFoundException('Entity not found!');
    await this.repository.softRemove(e);
    return e;
  }

  /**
   * Inserts an entity into the database
   * @param entity The entity object to insert
   * @returns A promise that resolves to the `Entity` inserted
   */
  async insert(entity: DeepPartial<Entity>): Promise<Entity> {
    const e = this.repository.create(entity);

    try {
      return await this.repository.save(e);
    } catch (e) {
      if (e.message.startsWith('Duplicate entry')) {
        throw new BadRequestException('A similar entity already exists');
      } else {
        throw e;
      }
    }
  }

  /**
   * Updates an entity in the database
   * @param id The id of entity to update
   * @param entity Object containing the properties of entity to update
   * @returns A promise that resolves to the `Entity` updated
   */
  async update(id: string, entity: DeepPartial<Entity>): Promise<Entity> {
    const exists = await this.findOne(id);
    if (!exists) throw new NotFoundException('Entity not found!');
    const e = this.repository.create(entity);
    await this.repository.update(id, e);
    return await this.findOne(id);
  }

  /**
   * Counts rows in entity
   * @returns A number representing count of rows
   */
  async count(): Promise<number> {
    return await this.repository.count();
  }
}
