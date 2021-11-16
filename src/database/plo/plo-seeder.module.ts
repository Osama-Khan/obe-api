import { PLOEntity } from '@api/objective/plo/plo.entity';
import { PLOService } from '@api/objective/plo/plo.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PLOEntity])],
  providers: [PLOService],
})
export class PLOSeederModule {}
