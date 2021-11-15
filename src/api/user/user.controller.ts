import { CrudController } from '@shared/controllers/crud.controller';
import { Controller, Inject } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController extends CrudController<UserEntity, UserService> {
  constructor(@Inject(UserService) userService: UserService) {
    super(userService);
  }
}
