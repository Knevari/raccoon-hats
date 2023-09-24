import {
  Controller,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { HatsService } from './hats.service';
import { CreateHatDto } from './dto/create-hat.dto';

@Controller('hats')
export class HatsController {
  constructor(private readonly hatsService: HatsService) {}

  @Get('/api/products')
  async getHats() {
    return this.hatsService.getHats();
  }

  @Post('api/products')
  async createHat(@Body() dto: CreateHatDto) {
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
