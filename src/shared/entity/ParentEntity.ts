import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

/** A generic parent entity from which all database entities
 * should be derived.
 */
export class ParentEntity {
  /** ID of the entity */
  @PrimaryGeneratedColumn("uuid")
  id: string;

  /** Creation date of the entity */
  @CreateDateColumn({name: 'created_at'})
  createdAt: Date;  

  /** Last update date of the entity */
  @UpdateDateColumn({name: 'updated_at'})
  updatedAt: Date;

  /** Date the entity was deleted at (softremove only) */
  @DeleteDateColumn({name: 'deleted_at'})
  deletedAt: Date;
}