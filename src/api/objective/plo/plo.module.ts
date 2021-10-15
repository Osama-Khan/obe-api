import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PLOController } from './plo.controller';
import { PLOEntity } from './plo.entity';
import { PLOService } from './plo.service';

@Module({
  imports: [TypeOrmModule.forFeature([PLOEntity])],
  controllers: [PLOController],
  providers: [PLOService],
})
export class PLOModule {}
