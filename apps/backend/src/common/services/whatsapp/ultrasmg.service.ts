import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import qs from 'qs';
import { IsString, IsNotEmpty } from 'class-validator';

export class SendMessageDto {
  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  body: string;
}

@Injectable()
export class WhatsappService {
  async sendMessage(sendMessageDto: SendMessageDto): Promise<any> {
    const data = qs.stringify(sendMessageDto);

    const config = {
      method: 'post',
      url: 'https://api.ultramsg.com/instance66965/messages/chat',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: {
        ...qs.parse(data),
        token: "xlvx6ouwc4jxfupr"
      }
    };

    return axios(config)
      .then((response) => response.data)
      .catch((error) => {
        throw error; // You can rethrow the error here if you need to handle it further
      });
  }
}

