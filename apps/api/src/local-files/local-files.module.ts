import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LocalFilesService } from './local-files.service';
import { LocalFilesController } from './local-files.controller';
import { LocalFile, LocalFileSchema } from './schemas/local-file.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LocalFile.name, schema: LocalFileSchema },
    ]),
  ],
  providers: [LocalFilesService],
  controllers: [LocalFilesController],
  exports: [LocalFilesService],
})
export class LocalFilesModule {}
