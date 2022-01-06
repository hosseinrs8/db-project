import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { CreateEmployeePhoneDto } from './dto/create-employee-phone.dto';
import { UpdateEmployeePhoneDto } from './dto/update-employee-phone.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  //todo set return types

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  //type defines whether we're talking about an employee or a supporter
  @Get(':type/:id')
  findOne(@Param('type') type: string, @Param('id') id: string) {
    return this.employeeService.findOne(type, +id);
  }

  @Delete(':type/:id')
  remove(@Param('type') type: string, @Param('id') id: string) {
    return this.employeeService.remove(type, +id);
  }

  @Post(':id/phone')
  createPhone(
    @Param('id') ownerId: string,
    @Body() createEmployeePhoneDto: CreateEmployeePhoneDto,
  ) {
    return this.employeeService.createPhone(+ownerId, createEmployeePhoneDto);
  }

  @Patch('phone/:key')
  updatePhone(
    @Param('key') key: string,
    @Body() updateEmployeePhone: UpdateEmployeePhoneDto,
  ) {
    return this.employeeService.updatePhone(key, updateEmployeePhone);
  }

  @Get('phone/:type/:ownerId')
  findAllPhones(
    @Param('type') type: string,
    @Param('ownerId') ownerId: string,
  ) {
    return this.employeeService.findAllPhone(type, +ownerId);
  }

  @Get('phone/:type/:key')
  findOnePhone(@Param('type') type: string, @Param('key') key: string) {
    return this.employeeService.findOnePhone(type, key);
  }

  @Delete('phone/:type/:key')
  removePhone(@Param('type') type: string, @Param('phoneKey') key: string) {
    return this.employeeService.removePhone(type, key);
  }
}
