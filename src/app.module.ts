import { MiddlewareConsumer, Module, NestModule, RequestMethod, Scope } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/http-exeception.filter';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { FreezePipe } from './pipes/freeze.pipe';
import { RequestService } from './request.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    RequestService,

    // ----------------------------------------
    // APP_INTERCEPTOR -> 
    // you can register in appendFile.nodule.ts or controller or mainModule.ts
    // ----------------------------------------
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST, 
      useClass: LoggingInterceptor,
    },

    // ----------------------------------------
    // APP FILTER -> 
    // you can register filter globally in app.module.ts 
    // or for individual routes

    // ----------------------------------------
    // {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter,
    // },

    // ----------------------------------------
    // APPGUARD
    //  you can define global level authguards here
    // ----------------------------------------
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },

    // ----------------------------------------
    // APP PIPE
    //  you can register global level pipes here
    // ----------------------------------------
    // {
    //   provide: APP_PIPE,
    //   useClass: FreezePipe,
    // },
  ],
})

    // ----------------------------------------
    // you can register your middleware here
    // you can also do it in the maint.s file as well
    // you can apply this middleware for a specific route
    // ----------------------------------------   
    
export class AppModule implements NestModule {
  //NestModule -> has a configure()
  configure(consumer: MiddlewareConsumer) {

    //you can apply this middleware for a all routes or globally
    consumer.apply(AuthenticationMiddleware).forRoutes('*');


    // you can apply this middleware for a specific route
    //consumer.apply(AuthenticationMiddleware).forRoutes({path:'/path', method: RequestMethod.GET})

  }
}
