import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LocalFile } from './schemas/local-file.schema';
import { Model } from 'mongoose';

@Injectable()
export class LocalFilesService {
  constructor(
    @InjectModel(LocalFile.name) private localFilesModel: Model<LocalFile>,
  ) {}

  async getFileById(fileId: number) {
    const file = await this.localFilesModel.findOne({ id: fileId });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }

  async saveLocalFileData(dto: LocalFileDto) {
    const newFile = new this.localFilesModel(dto);
    await newFile.save();
    return newFile;
  }
}
