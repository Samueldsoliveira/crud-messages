import { Injectable, NotFoundException } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';
import { CreateMessagesDto } from './dto/create-messages.dto';
import { UpdateMessagesDto } from './dto/update-messages.dto';

@Injectable()
export class MessagesService {
  private lastId = 1;
  private messages: MessageEntity[] = [
    {
      id: 1,
      text: 'This is a test message',
      from: 'Joana',
      to: 'João',
      read: false,
      date: new Date(),
    },
  ];

  findAll() {
    return this.messages;
  }

  findOne(id: string) {
    const message = this.messages.find((message) => message.id === +id);

    if (message) {
      return message;
    }

    // throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Message not found');
  }

  create(createMessageDto: CreateMessagesDto) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...createMessageDto,
      read: false,
      date: new Date(),
    };

    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: string, updateMessageDto: UpdateMessagesDto) {
    const indexExistentMessage = this.messages.findIndex(
      (item) => item.id === +id,
    );

    if (indexExistentMessage < 0) {
      throw new NotFoundException('Message not found');
    }

    if (indexExistentMessage >= 0) {
      const existentMessage = this.messages[indexExistentMessage];

      this.messages[indexExistentMessage] = {
        ...existentMessage,
        ...updateMessageDto,
      };
    }

    return this.messages[indexExistentMessage];
  }

  remove(id: string) {
    const indexExistentMessage = this.messages.findIndex(
      (item) => item.id === +id,
    );

    if (indexExistentMessage < 0) {
      throw new NotFoundException('Message not found');
    }

    const message = this.messages[indexExistentMessage];
    this.messages.splice(indexExistentMessage, 1);

    return message;
  }
}
