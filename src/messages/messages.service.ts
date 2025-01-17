import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessagesDto } from './dto/create-messages.dto';
import { UpdateMessagesDto } from './dto/update-messages.dto';
import { Message } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      text: 'This is a test message',
      from: 'Joana',
      to: 'João',
      read: false,
      date: new Date(),
    },
  ];

  async findAll() {
    const messages = await this.messageRepository.find();
    return messages;
  }

  async findOne(id: number) {
    // const message = this.messages.find((message) => message.id === id);
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
    });

    if (message) {
      return message;
    }

    // throw new HttpException('Message not found', HttpStatus.NOT_FOUND);
    throw new NotFoundException('Message not found');
  }

  async create(createMessageDto: CreateMessagesDto) {
    const newMessage = {
      ...createMessageDto,
      read: false,
      date: new Date(),
    };

    const recado = await this.messageRepository.create(newMessage);

    return this.messageRepository.save(recado);
  }

  async update(id: number, updateMessageDto: UpdateMessagesDto) {
    const partialUpdateMessageDto = {
      read: updateMessageDto?.read,
      text: updateMessageDto?.text,
    };
    const message = await this.messageRepository.preload({
      id,
      ...partialUpdateMessageDto,
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return this.messageRepository.save(message);
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({
      id,
    });

    if (!message) {
      throw new NotFoundException('Message not found');
    }

    return this.messageRepository.remove(message);
  }
}
