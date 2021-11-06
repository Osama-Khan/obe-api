import { ParentEntity } from '@shared/entity/ParentEntity';
import { Entity } from 'typeorm';

@Entity({ name: 'allocation' })
export class AllocationEntity extends ParentEntity {
}
