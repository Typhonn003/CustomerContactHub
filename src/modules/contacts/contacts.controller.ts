import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createContactDto: CreateContactDto, @Request() req) {
    return this.contactsService.create(createContactDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':contact_id')
  findOne(@Param('contact_id') contact_id: string) {
    return this.contactsService.findOne(contact_id);
  }

  @Patch(':contact_id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('contact_id') contact_id: string,
    @Body() updateContactDto: UpdateContactDto,
  ) {
    return this.contactsService.update(contact_id, updateContactDto);
  }

  @Delete(':contact_id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('contact_id') contact_id: string) {
    return this.contactsService.remove(contact_id);
  }
}
