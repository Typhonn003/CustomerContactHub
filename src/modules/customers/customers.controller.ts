import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return this.customersService.getProfile(req.user.id);
  }

  @Get(':customer_id')
  findOne(@Param('customer_id') customer_id: string) {
    return this.customersService.findOne(customer_id);
  }

  @Patch(':customer_id')
  update(
    @Param('customer_id') customer_id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(customer_id, updateCustomerDto);
  }

  @HttpCode(204)
  @Delete(':customer_id')
  remove(@Param('customer_id') customer_id: string) {
    return this.customersService.remove(customer_id);
  }
}
