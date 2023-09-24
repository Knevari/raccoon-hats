import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { HatsModule } from 'src/hats/hats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URL),
    HatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
