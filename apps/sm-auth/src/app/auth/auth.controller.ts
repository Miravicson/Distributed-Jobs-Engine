import { Controller, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  AuthenticateRequest,
  AuthServiceController,
  AuthServiceControllerMethods,
  User,
} from 'types/proto/auth';

@Controller()
@AuthServiceControllerMethods()
export class AuthController implements AuthServiceController {
  private readonly logger = new Logger(this.constructor.name);
  authenticate(
    request: AuthenticateRequest
  ): Promise<User> | Observable<User> | User {
    this.logger.verbose(request);
    return {} as any;
  }
}
