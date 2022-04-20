import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exeception.filter';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { FreezePipe } from './pipes/freeze.pipe';

@Controller('test')

// ----------------------------------------
//you can use guard here to restrcit the whole controller
//@UseGuards(AuthGuard)
// ----------------------------------------

// ----------------------------------------
//you can use interceptors here here for all the controllers here
//@UseInterceptors(LoggingInterceptor)
// ----------------------------------------
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  //---------------------------------------------------
  //you can use guard here to restrcit individual request
  //---------------------------------------------------
  // @UseGuards(AuthGuard)

  //---------------------------------------------------
  //you can use interceptors here for an individual request
  //---------------------------------------------------
  // @UseInterceptors(LoggingInterceptor)
  getHello(): string {
    return this.appService.getHello();
  }
  
  //---------------------------------------------------
  //you can use pipe for individual request
  //---------------------------------------------------
  @Post()
  // the freeze guards gets applied to all the arguments
  // @UseGuards(FreezePipe)

  examplePost(@Body(new FreezePipe())  body: any) {
    body.test = 32;
    console.log(body)
  }

  @Get('error')
  @UseFilters(HttpExceptionFilter)
  throwError() {
    //https errors will go through the httpexception filter
    throw new InternalServerErrorException();
  }
}
