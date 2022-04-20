import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exeception.filter';
import { AuthGuard } from './guards/auth.guard';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { AuthenticationMiddleware } from './middleware/authentication.middleware';
import { FreezePipe } from './pipes/freeze.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ----------------------------------------
  // MIDDLEWARE REGISTERY
  // you can register your middleware here
  // you can also do it in the app.modile.ts file
  // if you have depedndecy injected it will not work well
  // ----------------------------------------
  // app.use(new AuthenticationMiddleware())


  // ----------------------------------------
  // AUTHGUARD REGISTERY
  // you can register your authguards here
  // if you have dependecy injected it will not work well
  // you can apply guards in the conreoller level for individual request or for whol controller
  // ----------------------------------------
  // app.useGlobalGuards(new AuthGuard)


  // ----------------------------------------
  // INTERCEPTOR REGISTERY
  // you can register your authguards here
  // if you have dependecy injected it will not work well
  // you can register interceptors in: app.module.ts file, controller for an individual request
  // ----------------------------------------
  // app.useGlobalInterceptors(new LoggingInterceptor())


  // ----------------------------------------
  // PIPE REGISTERY
  // you can register your PIPE here
  // if you have dependecy injected it will not work well
  // you can register interceptors in: app.module.ts file, controller for an individual request
  // ----------------------------------------
  // app.useGlobalPipes(new FreezePipe())


  // ----------------------------------------
  // FILTER REGISTERY
  // you can register your PIPE here
  // if you have dependecy injected it will not work well
  // you can register PIPES in: app.module.ts file, controller for an individual request
  // ----------------------------------------
  // app.useGlobalFilters(new HttpExceptionFilter())

  await app.listen(3000);
}
bootstrap();
