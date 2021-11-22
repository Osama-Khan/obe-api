import { UserEntity } from '@api/user/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtHelper } from '@shared/helpers';
import { RoleEntity } from '@api/role/role.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repository: Repository<UserEntity>,
  ) {}

  /** Logs the user in using username and password */
  async login(data: Pick<UserEntity, 'username' | 'password'>) {
    const u = await this.repository.findOne(
      { username: data.username },
      { relations: ['role'] },
    );
    if (!u) throw new BadRequestException('No such user!');
    if (await bcrypt.compare(data.password, u.password)) {
      const { password, ...user } = u;
      const token = JwtHelper.sign({ id: u.id, role: u.role });
      return { ...user, token };
    }
    throw new BadRequestException('Invalid password!');
  }

  /** Logs the user in using a valid JWT token */
  async loginWithToken(token: string) {
    let user: { id: string; role: RoleEntity };
    try {
      user = JwtHelper.verify(token) as any;
    } catch (e) {
      throw new BadRequestException('Invalid Token!');
    }
    const u = await this.repository.findOne(user.id, { relations: ['role'] });
    if (!u) throw new BadRequestException('No such user!');
    return u;
  }
}
