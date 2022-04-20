import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name)

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log(' authnticating token in '+AuthGuard.name)
    const request = context.switchToHttp().getRequest();
    //you can json webtoken authentication here

    /*
    if you -> return false 
    you will get
    {
      "statusCode": 403,
      "timestamp": "2022-04-20T13:14:58.902Z",
      "path": "/"
    }
    for all request
    */
    return true;
  }
}
