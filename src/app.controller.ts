import { Controller, Get, Redirect } from '@nestjs/common';
import { Public } from './decorators/public.decorator';

@Controller()
export class AppController {
  @Get()
  @Public()
  @Redirect('/api/#', 301)
  documentation() {
    return;
  }
}
