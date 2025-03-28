import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const data = {
      id: '123',
       firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
    }
    return JSON.stringify(data);
  }
}
