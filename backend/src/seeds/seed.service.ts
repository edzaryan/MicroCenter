import { Injectable } from '@nestjs/common';

@Injectable()
export class SeedService {
  async run() {
    console.log('Seeding started...');
    // your logic here
  }
}