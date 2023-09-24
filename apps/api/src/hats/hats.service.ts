import slugify from 'slugify';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Hat } from './schemas/hat.schema';
import { CreateHatDto } from './dto/create-hat.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UpdateHatDto } from './dto';

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
    const newHat = new this.hatModel({
      ...rest,
      slug,
    });
    const image = await this.cloudinaryService.uploadImage(
      imageFile,
      `hats/${newHat._id}`,
    );
    newHat.imageUrl = image.url;
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

  async updateHatByID(
    id: string,
    { name, image: imageFile, ...dto }: UpdateHatDto,
  ) {
    const hat = await this.hatModel.findById(id);

    if (!hat) {
      throw new NotFoundException();
    }

    const extra = {} as { imageUrl?: string; name?: string; slug?: string };

    if (imageFile) {
      const image = await this.cloudinaryService.uploadImage(
        imageFile,
        `hts/${id}`,
      );
      extra.imageUrl = image.url;
    }

    if (name) {
      extra.name = name;
      extra.slug = slugify(name);
    }

    return hat.updateOne({ ...dto, ...extra });
  }

  async deleteHatByID(id: string) {
    return this.hatModel.findByIdAndDelete(id);
  }
}
