import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { RequestService } from '../request.service';


// --------------------------------------------------------------
// You can register the inerceptror in app.module.ts or main.ts file
// --------------------------------------------------------------
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  constructor(private readonly requestService: RequestService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // --------------------------------------------------------------
    //  this will be executed before the route handler is called ...
    // --------------------------------------------------------------
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url } = request;

    this.logger.log(
      `${method} ${url} ${userAgent} ${ip}: ${context.getClass().name} ${context.getHandler().name} invoked...`
    );

    this.logger.debug('userId:', this.requestService.getUserId());

    const now = Date.now();

    // --------------------------------------------------------------
    //  this will be executed after route handler is called ...
    // --------------------------------------------------------------
    return next.handle().pipe(
      tap((res) => {

        //you can get the response here . .
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;
        const contentLength = response.get('content-length');

        this.logger.log(
          `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}: ${Date.now() - now}ms`,
        );
        this.logger.debug('Response:', res);
      }),
      catchError((err) => {
        this.logger.error(err);
        return throwError(() => err);
      }),
    );
  }
}
