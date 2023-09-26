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
import { CreateHatDto, UpdateHatDto } from './dto';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('/api')
export class HatsController {
  constructor(private readonly hatsService: HatsService) {}

  @Get('/products')
  @HttpCode(HttpStatus.OK)
  async getHats() {
    return this.hatsService.getHats();
  }

  @Post('/products')
  @FormDataRequest()
  @HttpCode(HttpStatus.CREATED)
  async createHat(@Body() dto: CreateHatDto) {
    return this.hatsService.createHat(dto);
  }

  @Get('/products/:id')
  @HttpCode(HttpStatus.OK)
  async getHatByID(@Param('id') id: string) {
    return this.hatsService.getHatByID(id);
  }

  @Put('/products/:id')
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async updateHatByID(@Param('id') id: string, @Body() dto: UpdateHatDto) {
    return this.hatsService.updateHatByID(id, dto);
  }

  @Delete('/products/:id')
  @HttpCode(HttpStatus.OK)
  async deleteHatByID(@Param('id') id: string) {
    return this.hatsService.deleteHatByID(id);
  }
}
