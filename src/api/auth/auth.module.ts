import { UserEntity } from '@api/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
