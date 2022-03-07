import {Controller, Get, Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  //http://localhost:5000/?limit=10&page=800
  @Get()
  getHello(@Query('limit') limit: number,
           @Query('page') page: number): string {

    return this.appService.getHello(limit, page);
  }
}
