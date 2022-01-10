import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FactoryService } from './factory.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateFactoryDto } from './dto/update-factory.dto';
import { CreateFactoryPhoneDto } from './dto/create-factory-phone.dto';
import { UpdateFactoryPhoneDto } from './dto/update-factory-phone.dto';

@ApiTags('Factory')
@Controller('factory')
export class FactoryController {
  constructor(private readonly factoryService: FactoryService) {}

  //todo set return types

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFactoryDto: UpdateFactoryDto) {
    return this.factoryService.update(+id, updateFactoryDto);
  }

  @Post('phone')
  createPhone(@Body() createFactoryPhoneDto: CreateFactoryPhoneDto) {
    return this.factoryService.createPhone(createFactoryPhoneDto);
  }

  @Patch('phone/:key')
  updatePhone(
    @Param('key') key: string,
    @Body() updateFactoryPhoneDto: UpdateFactoryPhoneDto,
  ) {
    return this.factoryService.updatePhone(key, updateFactoryPhoneDto);
  }

  @Delete('phone/:key')
  removePhone(@Param('key') key: string) {
    return this.factoryService.removePhone(key);
  }

  @Get()
  find() {
    return this.factoryService.find();
  }

  @Get('phones')
  findPhones() {
    return this.factoryService.findPhones();
  }
}
