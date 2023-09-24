import slugify from 'slugify';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Hat } from './schemas/hat.schema';
import { CreateHatDto } from './dto/create-hat.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class HatsService {
  constructor(
    @InjectModel(Hat.name) private hatModel: Model<Hat>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getHats() {
    return this.hatModel.find();
  }

  async createHat(dto: CreateHatDto) {
    const { image: imageFile, ...rest } = dto;
    const slug = slugify(dto.name, { lower: true });
    const image = await this.cloudinaryService.uploadImage(
      imageFile,
      `hats/${slug}`,
    );
    const newHat = new this.hatModel({
      ...rest,
      imageUrl: image.url,
    });
    await newHat.save();
    return newHat;
  }

  async getHatByID(id: string) {
    return this.hatModel.findById(id);
  }

  async getHatByName(name: string) {
    const hat = await this.hatModel.findOne({ name });
    return hat;
  }

  async updateHatByID(id: string) {}

  async deleteHatByID(id: string) {
    return this.hatModel.findByIdAndDelete(id);
  }
}
