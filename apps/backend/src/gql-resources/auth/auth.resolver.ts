import { UseGuards } from '@nestjs/common'
import { Args, Context, Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { UserEntity } from '../users/entities/user.entity'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login.input'
import { RequestPasswordResetInput } from './dto/request-password-reset.input'
import { ResetPasswordInput } from './dto/reset-password.input'
import { ValidatePasswordResetTokenInput } from './dto/validate-password-reset-token.input'
import { LogoutEntity, MeEntity } from './entities/auth.entity'
import { ValidatePasswordResetTokenEntity } from './entities/validate-password-reset-token.entity'
import { Request } from 'express'
import { SessionLocalAuthGuard } from './guards/local-auth.guard'
import { GQLAuthGuard } from './guards/gql-auth.guard'
import { IsAuthenticated } from './guards/authenticated.guard'


@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity)
  @UseGuards(GQLAuthGuard, SessionLocalAuthGuard)
  async login(@Args('loginInput') loginInput: LoginInput, @Context('req') request: any) {
    console.log('mutation',request.session)
    const user = await this.authService.login(loginInput)
    return user
  }

  @Mutation(() => UserEntity)
  async requestPasswordReset(
    @Args('requestPasswordResetInput') requestPasswordResetInput: RequestPasswordResetInput
  ) {
    const user = await this.authService.requestPasswordReset(requestPasswordResetInput)

    return user
  }

  @Mutation(() => UserEntity)
  async resetPassword(@Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput) {
    const user = await this.authService.resetPasswordWithToken(resetPasswordInput)

    return user
  }

  @Mutation(() => ValidatePasswordResetTokenEntity)
  async validatePasswordResetToken(
    @Args('validatePasswordResetTokenInput')
    validatePasswordResetTokenInput: ValidatePasswordResetTokenInput
  ) {
    const result = await this.authService.validatePasswordResetToken(
      validatePasswordResetTokenInput
    )

    return result
  }

  @Query(() => LogoutEntity)
  @UseGuards(IsAuthenticated)
  async logout(@Context('req') request: Request) {
    request.session.destroy(console.error)

    return { status: 'Success' }
  }

  @Query(() => MeEntity)
  @UseGuards(IsAuthenticated)
  async me(@Context('req') request: Request) {
    console.log('this is user iddddd', request.user.id)
    return {
      userId: request.user.id,
      roles: request.user.roles
    }
  }
}

@ObjectType()
export class TestEntityV2 {
  @Field(() => Boolean)
  test!: boolean
}

