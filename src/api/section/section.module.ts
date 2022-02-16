import { UserEntity } from '@api/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionController } from './section.controller';
import { SectionEntity } from './section.entity';
import { SectionService } from './section.service';

@Module({
  imports: [TypeOrmModule.forFeature([SectionEntity, UserEntity])],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
