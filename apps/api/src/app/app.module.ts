import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import * as Joi from '@hapi/joi';
import { HatsModule } from 'src/hats/hats.module';
import { LocalFilesModule } from 'src/local-files/local-files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: Joi.object({
        FILES_DESTINATION_FOLDER: Joi.string().required(),
      }),
    }),

    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URL),
    LocalFilesModule,
    HatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
