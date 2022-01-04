import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Employee } from './entities/employee.entity';
import { EmployeePhone } from './entities/employee-phone.entity';
import { Supporter } from './entities/supporter.entity';
import { SupporterPhone } from './entities/supporter-phone.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      Employee,
      EmployeePhone,
      Supporter,
      SupporterPhone,
    ]),
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
