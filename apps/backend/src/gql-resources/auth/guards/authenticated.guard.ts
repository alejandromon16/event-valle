import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
  applyDecorators,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { Request } from 'express'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctxRequest = GqlExecutionContext.create(context).getContext().req as Request

    return ctxRequest.isAuthenticated()
  }
}

export const Protected = () => applyDecorators(UseGuards(AuthenticatedGuard))
