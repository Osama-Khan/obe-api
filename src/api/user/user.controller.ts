import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController extends CrudController<UserEntity, UserService> {
  constructor(@Inject(UserService) userService: UserService) {
    super(userService);
  }

  /**
   * Returns result of the student
   * @param id ID of the student
   * @returns Result represented by percentage obtained in PLOs
   */
  @Get(':id/result')
  getResult(@Param('id') id: string) {
    return this.service.getResult(id);
  }

  /**
   * Returns detailed result of the student
   * @param id ID of the student
   * @param ploId ID of the plo
   * @returns Result object containing detailed evaluations
   */
  @Get(':id/result/plo/:ploId')
  getResultDetail(@Param('id') id: string, @Param('ploId') ploId: string) {
    return this.service.getResultDetail(id, ploId);
  }
}
