import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtHelper } from '@shared/helpers';

@Injectable()
export class UserService extends ApiService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  async login(data: Pick<UserEntity, 'username' | 'password'>) {
    const u = await this.repository.findOne({ username: data.username });
    if (!u) throw new BadRequestException('No such user!');
    if (await bcrypt.compare(data.password, u.password)) {
      const { password, ...user } = u;
      const token = JwtHelper.sign({ id: u.id, isAdmin: u.isAdmin });
      return { ...user, token };
    }
    throw new BadRequestException('Invalid password!');
  }
}
