import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessagesDto } from './dto/create-messages.dto';
import { UpdateMessagesDto } from './dto/update-messages.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Query() pagination: any) {
    const { limit = 10, offset = 0 } = pagination;
    // return `This action returns all messages. Limit: ${limit}, Offset: ${offset}`;
    return this.messagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.findOne(id);
  }

  @Post()
  create(@Body() createBodyDto: CreateMessagesDto) {
    return this.messagesService.create(createBodyDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMessagesDto: UpdateMessagesDto,
  ) {
    return this.messagesService.update(id, updateMessagesDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
    return this.messagesService.remove(id);
  }
}
