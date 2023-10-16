import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserEntity } from '../users/entities/user.entity';

export const getCurrentUserByContext = (context: ExecutionContext): UserEntity => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  if ((context.getType() as any) === 'graphql') {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
