import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CentralOfficeService } from './central-office.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateCentralOfficeDto } from './dto/update-central-office.dto';
import { CreatePhoneDto, PhoneOwners } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';
import { UpdateGeneralManagerDto } from './dto/update-general-manager.dto';

@ApiTags('Central Office')
@Controller('central-office')
export class CentralOfficeController {
  constructor(private readonly centralOfficeService: CentralOfficeService) {}

  //todo set return types

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCentralOfficeDto: UpdateCentralOfficeDto,
  ) {
    return this.centralOfficeService.update(+id, updateCentralOfficeDto);
  }

  @Patch('manager/:id')
  updateManager(
    @Param('id') id: string,
    @Body() updateGeneralManagerDto: UpdateGeneralManagerDto,
  ) {
    return this.centralOfficeService.updateManager(
      +id,
      updateGeneralManagerDto,
    );
  }

  @Post('phone')
  createPhone(@Body() createPhoneDto: CreatePhoneDto) {
    return this.centralOfficeService.createPhone(createPhoneDto);
  }

  @Patch('phone/:key/:owner') //todo add '/:owner
  updatePhone(
    @Param('key') key: string,
    @Param('owner') owner: PhoneOwners, //todo add
    @Body() updatePhoneDto: UpdatePhoneDto,
  ) {
    return this.centralOfficeService.updatePhone(key, owner, updatePhoneDto); //todo add owner
  }

  @Delete('phone/:key/:owner') //todo add '/:owner
  removePhone(
      @Param('key') key: string,
      @Param('owner') owner: PhoneOwners, //todo add
  ) {
    return this.centralOfficeService.removePhone(key, owner); //todo add owner
  }

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
