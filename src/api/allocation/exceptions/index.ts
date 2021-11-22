import { BadRequestException } from '@nestjs/common';

/** Exception used to output an error from Allocation Excel file if
 * file contains insertion data that is not in database
 */
export class ExcelDataNotFoundException extends BadRequestException {
  constructor(entityName: string, entityData: string, rowNumber: number) {
    super(
      `${entityName} "${entityData}" not found in database!\nAt row # ${rowNumber}`,
    );
  }
}
