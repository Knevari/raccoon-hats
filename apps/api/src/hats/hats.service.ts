import { Injectable } from '@nestjs/common';
import { CreateHatDto } from './dto/create-hat.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Hat } from './schemas/hat.schema';
import { Model } from 'mongoose';

@Injectable()
export class HatsService {
  constructor(@InjectModel(Hat.name) private hatModel: Model<Hat>) {}

  async getHats() {}

  async createHat(dto: CreateHatDto) {}

  async getHatByID(id: string) {}

  async getHatByName(name: string) {
    const hat = await this.hatModel.findOne({ name });
    return hat;
  }

  async updateHatByID(id: string) {}

  async deleteHatByID(id: string) {}
}
