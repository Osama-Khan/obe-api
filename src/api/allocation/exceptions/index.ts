import { BadRequestException } from '@nestjs/common';

export class ExcelDataNotFoundException extends BadRequestException {
  constructor(entityName: string, entityData: string, rowNumber: number) {
    super(
      `${entityName} "${entityData}" not found in database!\nAt row # ${rowNumber}`,
    );
  }
}
