import { PipeTransform } from '@nestjs/common';
import {
  Equal,
  FindOperator,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Not,
} from 'typeorm';
type FilterOperator =
  | '='
  | '>'
  | '<'
  | '>='
  | '<='
  | '!='
  | 'like'
  | 'not like';

type CriteriaWhere = {
  key: string;
  operator: FilterOperator;
  value: string;
};

/** Validates Criteria object in body */
export default class CriteriaValidationPipe implements PipeTransform {
  transform(criteria?: { where: CriteriaWhere[][] }) {
    if (!criteria?.where) return criteria;
    const where = criteria.where.map((w) => {
      const obj: any = {};
      w.forEach((_w) => {
        obj[_w.key] = this.toFindOperator(_w.operator, _w.value);
      });
      return obj;
    });
    criteria.where = where;
    return criteria;
  }

  /**
   * Converts string operator and value to FindOperator
   * @returns FindOperator object with operator applied
   */
  private toFindOperator(
    operator: FilterOperator,
    value: string,
  ): FindOperator<string> | undefined {
    return operator === '='
      ? Equal(value)
      : operator === '>'
      ? MoreThan(value)
      : operator === '<'
      ? LessThan(value)
      : operator === '>='
      ? MoreThanOrEqual(value)
      : operator === '<='
      ? LessThanOrEqual(value)
      : operator === '!='
      ? Not(Equal(value))
      : operator === 'like'
      ? ILike(value)
      : operator === 'not like'
      ? Not(ILike(value))
      : undefined;
  }
}
