import { ApiError } from '@eventvalle/api/shared/exceptions';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpStatus,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class IsAuthenticated implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const ctxReq = GqlExecutionContext.create(context).getContext().req;
    const AuthenticationStatus = ctxReq.isAuthenticated();
    console.log(AuthenticationStatus)
    if (!AuthenticationStatus) {
      throw new ApiError(`Password reset token has expired`, {
        statusCode: HttpStatus.UNAUTHORIZED,
        type: 'authenticate_error',
        explanation: 'You are not login. Please login',
      })
    }
    return AuthenticationStatus;
  }
}
