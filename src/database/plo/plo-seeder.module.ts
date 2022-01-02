import { CLOEntity } from '@api/objective/clo/clo.entity';
import { ObjectiveMapEntity } from '@api/objective/map/map.entity';
import { PLOEntity } from '@api/objective/plo/plo.entity';
import { PLOService } from '@api/objective/plo/plo.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([PLOEntity, ObjectiveMapEntity, CLOEntity]),
  ],
  providers: [PLOService],
})
export class PLOSeederModule {}
