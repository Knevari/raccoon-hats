import { Module } from '@nestjs/common';
import { HatsService } from './hats.service';
import { HatsController } from './hats.controller';
import { Hat, HatSchema } from './schemas/hat.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HatNameNotRegisteredValidator } from './validation-rules/hat-name-not-registered.rule';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    NestjsFormDataModule,
    CloudinaryModule,
    MongooseModule.forFeature([{ name: Hat.name, schema: HatSchema }]),
  ],
  providers: [HatsService, HatNameNotRegisteredValidator],
  controllers: [HatsController],
})
export class HatsModule {}
