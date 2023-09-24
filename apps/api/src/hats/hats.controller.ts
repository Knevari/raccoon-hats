import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { HatsService } from './hats.service';
import { CreateHatDto } from './dto/create-hat.dto';
import { FormDataRequest } from 'nestjs-form-data';

const fiveMb = Math.pow(1024, 2) * 5;

@Controller('hats')
export class HatsController {
  constructor(private readonly hatsService: HatsService) {}

  @Get('/api/products')
  @HttpCode(HttpStatus.OK)
  async getHats() {
    return this.hatsService.getHats();
  }

  @Post('api/products')
  @FormDataRequest()
  @HttpCode(HttpStatus.CREATED)
  async createHat(@Body() dto: CreateHatDto) {
    return this.hatsService.createHat(dto);
  }

  @Get('/api/products/:id')
  @HttpCode(HttpStatus.OK)
  async getHatByID(@Param('id') id: string) {
    return this.hatsService.getHatByID(id);
  }

  @Put('/api/products/:id')
  @HttpCode(HttpStatus.OK)
  async updateHatByID(@Param('id') id: string) {
    return this.hatsService.updateHatByID(id);
  }

  @Delete('/api/products/:id')
  @HttpCode(HttpStatus.OK)
  async deleteHatByID(@Param('id') id: string) {
    return this.hatsService.deleteHatByID(id);
  }
}
