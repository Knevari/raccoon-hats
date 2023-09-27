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
import { ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/api')
export class HatsController {
  constructor(private readonly hatsService: HatsService) {}

  @Get('/products')
  @ApiOperation({ summary: 'Retrieves a list of all registered hats' })
  @HttpCode(HttpStatus.OK)
  async getHats() {
    return this.hatsService.getHats();
  }

  @Get('/products/:id')
  @ApiOperation({ summary: 'Retrieves a hat by its ID' })
  @HttpCode(HttpStatus.OK)
  async getHatByID(@Param('id') id: string) {
    return this.hatsService.getHatByID(id);
  }

  @Post('/products')
  @ApiOperation({ summary: 'Creates a new hat' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Adds a new hat to the database with the given values',
    type: CreateHatDto,
  })
  @FormDataRequest()
  @HttpCode(HttpStatus.CREATED)
  async createHat(@Body() dto: CreateHatDto) {
    return this.hatsService.createHat(dto);
  }

  @Put('/products/:id')
  @ApiOperation({ summary: 'Updates a hat with given ID' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Updates the given hat with its new values',
    type: UpdateHatDto,
  })
  @FormDataRequest()
  @HttpCode(HttpStatus.OK)
  async updateHatByID(@Param('id') id: string, @Body() dto: UpdateHatDto) {
    return this.hatsService.updateHatByID(id, dto);
  }

  @Delete('/products/:id')
  @ApiOperation({ summary: 'Delete a hat by its ID' })
  @HttpCode(HttpStatus.OK)
  async deleteHatByID(@Param('id') id: string) {
    return this.hatsService.deleteHatByID(id);
  }
}
