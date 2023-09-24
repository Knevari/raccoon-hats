import { Injectable } from '@nestjs/common';
import { CreateHatDto } from './dto/CreateHatDto';

@Injectable()
export class HatsService {
  async getHats() {}

  async createHat(dto: CreateHatDto) {}

  async getHatByID(id: string) {}

  async updateHatByID(id: string) {}

  async deleteHatByID(id: string) {}
}
