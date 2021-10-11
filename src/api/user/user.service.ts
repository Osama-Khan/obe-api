import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiService } from '@shared/services/api.service';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService extends ApiService<UserEntity> {
  constructor(
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
    super(repository);
  }

  async login(data: Pick<UserEntity, 'username' | 'password'>) {
    const user = await this.repository.findOne({ username: data.username });
    if (!user) throw new BadRequestException('No such user!');
    if (await bcrypt.compare(data.password, user.password)) {
      return {};
    }
    throw new BadRequestException('Invalid password!');
  }
}
