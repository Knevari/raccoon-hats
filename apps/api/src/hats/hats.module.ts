import { Module } from '@nestjs/common';
import { HatsService } from './hats.service';
import { HatsController } from './hats.controller';

@Module({
  providers: [HatsService],
  controllers: [HatsController]
})
export class HatsModule {}
