import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext, GraphQLExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const ctx: GraphQLExecutionContext = GqlExecutionContext.create(context)
    const gqlReq = ctx.getContext().req
    const loginInput = ctx.getArgs()?.loginInput
    // const session = gqlReq.session

    gqlReq.body.email = loginInput.email
    gqlReq.body.password = loginInput.password

    return gqlReq
  }
}
