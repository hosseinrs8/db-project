import { Controller, Get } from '@nestjs/common';
import { CentralOfficeService } from './central-office.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Central Office')
@Controller('central-office')
export class CentralOfficeController {
  constructor(private readonly centralOfficeService: CentralOfficeService) {}

  //todo add update for central-office and generalManager
  //todo add create, update, delete for phone
  //todo set return types

  @Get()
  find() {
    return this.centralOfficeService.find();
  }

  @Get('manager')
  findManager() {
    return this.centralOfficeService.findManager();
  }

  @Get('phones')
  findPhones() {
    return this.centralOfficeService.findPhones();
  }

  @Get('manager/phones')
  findManagerPhones() {
    return this.centralOfficeService.findManagerPhones();
  }
}
