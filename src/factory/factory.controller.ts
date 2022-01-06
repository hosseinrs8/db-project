import { Controller, Get } from '@nestjs/common';
import { FactoryService } from './factory.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Factory')
@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  //todo add update for factory
  //todo add create, update, delete for phone
  //todo set return types

  @Get()
  find() {
    return this.factoryService.find();
  }

  @Get('phones')
  findPhones() {
    return this.factoryService.findPhones();
  }
}
