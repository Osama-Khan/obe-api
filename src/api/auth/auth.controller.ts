import { UserEntity } from '@api/user/user.entity';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private service: AuthService) {}

  @Post('login')
  login(@Body() data: Pick<UserEntity, 'password' | 'username'>) {
    return this.service.login(data);
  }

  @Post('token')
  loginWithToken(@Body() data: { token: string }) {
    return this.service.loginWithToken(data.token);
  }
}
