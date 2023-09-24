import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseInterceptors,
  BadRequestException,
  UploadedFile,
} from '@nestjs/common';
import { HatsService } from './hats.service';
import { CreateHatDto } from './dto/create-hat.dto';
import LocalFilesInterceptor from '../local-files/interceptors/local-files.interceptor';

const fiveMb = Math.pow(1024, 2) * 5;

@Controller('hats')
export class HatsController {
  constructor(private readonly hatsService: HatsService) {}

  @Get('/api/products')
  async getHats() {
    return this.hatsService.getHats();
  }

  @Post('api/products')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/images/hats',
      fileFilter: (_, file, callback) => {
        if (!file.mimetype.includes('image')) {
          return callback(
            new BadRequestException(
              "Provide a valid image and make sure it's size is below 5mb",
            ),
            false,
          );
        }
        callback(null, true);
      },
      limits: {
        fileSize: fiveMb,
      },
    }),
  )
  async createHat(@Body() dto: CreateHatDto, @UploadedFile() file: File) {
    console.log({ file });
    return this.hatsService.createHat(dto);
  }

  @Get('/api/products/:id')
  async getHatByID(@Param('id') id: string) {
    return this.hatsService.getHatByID(id);
  }

  @Put('/api/products/:id')
  async updateHatByID(@Param('id') id: string) {
    return this.hatsService.updateHatByID(id);
  }

  @Delete('/api/products/:id')
  async deleteHatByID(@Param('id') id: string) {
    return this.hatsService.deleteHatByID(id);
  }
}
