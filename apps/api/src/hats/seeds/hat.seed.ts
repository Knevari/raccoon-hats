import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { HatsService } from '../hats.service';

import { hats } from './data';

@Injectable()
export class HatsSeed {
  constructor(private readonly hatsService: HatsService) {}

  @Command({
    command: 'create::hats',
    describe: 'Creates a group of hats for testing',
  })
  async create() {}
}
