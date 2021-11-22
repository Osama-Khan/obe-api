import { UserEntity } from '@api/user/user.entity';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(@Inject(AuthService) private service: AuthService) {}

  /** Login endpoint that uses username and password combination for login */
  @Post('login')
  login(@Body() data: Pick<UserEntity, 'password' | 'username'>) {
    return this.service.login(data);
  }

  /** Login endpoint that uses token to re-login the user into their session */
  @Post('token')
  loginWithToken(@Body() data: { token: string }) {
    return this.service.loginWithToken(data.token);
  }
}
