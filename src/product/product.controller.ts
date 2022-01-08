import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateMicrowaveDto } from './dto/create-microwave.dto';
import { CreateOvenDto } from './dto/create-oven.dto';
import { CreateVacuumDto } from './dto/create-vacuum.dto';
import { CreateWashingMachineDto } from './dto/create-washing-machine.dto';
import { CreateRefrigeratorDto } from './dto/create-refrigerator.dto';
import { CreateTvDto } from './dto/create-tv.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //todo set return types

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.productService.remove(+id);
  }

  @Post('microwave')
  createMicrowave(@Body() createMicrowaveDto: CreateMicrowaveDto) {
    return this.productService.createMicrowave(createMicrowaveDto);
  }

  @Get('microwave')
  findAllMicrowaves() {
    return this.productService.findAllMicrowaves();
  }

  @Post('oven')
  createOven(@Body() createOvenDto: CreateOvenDto) {
    return this.productService.createOven(createOvenDto);
  }

  @Get('oven')
  findAllOvens() {
    return this.productService.findAllOvens();
  }

  @Post('refrigerator')
  createRefrigerator(@Body() createRefrigeratorDto: CreateRefrigeratorDto) {
    return this.productService.createRefrigerator(createRefrigeratorDto);
  }

  @Get('refrigerator')
  findAllRefrigerators() {
    return this.productService.findAllRefrigerators();
  }

  @Post('tv')
  createTv(@Body() createTvDto: CreateTvDto) {
    return this.productService.createTv(createTvDto);
  }

  @Get('tv')
  findAllTvs() {
    return this.productService.findAllTvs();
  }

  @Post('vacuum')
  createVacuumCleaner(@Body() createVacuumDto: CreateVacuumDto) {
    return this.productService.createVacuumCleaner(createVacuumDto);
  }

  @Get('vacuum')
  findAllVacuumCleaners() {
    return this.productService.findAllVacuumCleaners();
  }

  @Post('washing-machine')
  createWashingMachine(
    @Body() createWashingMachineDto: CreateWashingMachineDto,
  ) {
    return this.productService.createWashingMachine(createWashingMachineDto);
  }

  @Get('washing-machine')
  findAllWashingMachines() {
    return this.productService.findAllWashingMachines();
  }
}
