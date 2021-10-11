import { CrudController } from '@shared/controllers/crud.controller';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController extends CrudController<UserEntity, UserService> {
  constructor(@Inject(UserService) private userService: UserService) {
    super(userService);
  }

  @Post('login')
  login(@Body() data: Pick<UserEntity, 'password' | 'username'>) {
    return this.userService.login(data);
  }
}
