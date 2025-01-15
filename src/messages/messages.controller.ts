import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return 'This action returns all messages';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a message #${id}`;
  }

  @Post()
  create(@Body() body: any) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return {
      id,
      ...body,
    };
  }
}
