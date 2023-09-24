import { Module } from '@nestjs/common';
import { HatsService } from './hats.service';
import { HatsController } from './hats.controller';
import { Hat, HatSchema } from './schemas/hat.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Hat.name, schema: HatSchema }])],
  providers: [HatsService],
  controllers: [HatsController],
})
export class HatsModule {}
