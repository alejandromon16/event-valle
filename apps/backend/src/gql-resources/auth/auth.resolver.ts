import { UseGuards } from '@nestjs/common'
import { Args, Context, Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql'
import { UserEntity } from '../users/entities/user.entity'
import { AuthService } from './auth.service'
import { LoginInput } from './dto/login.input'
import { RequestPasswordResetInput } from './dto/request-password-reset.input'
import { ResetPasswordInput } from './dto/reset-password.input'
import { ValidatePasswordResetTokenInput } from './dto/validate-password-reset-token.input'
import { LogoutEntity } from './entities/auth.entity'
import { ValidatePasswordResetTokenEntity } from './entities/validate-password-reset-token.entity'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { Request } from 'express'
import { AuthenticatedGuard, Protected } from './guards/authenticated.guard'
import { GqlAuthGuard } from './guards/graphql-auth.guard'

@Resolver(() => UserEntity)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GqlAuthGuard, LocalAuthGuard)
  @Mutation(() => UserEntity)
  async login(@Args('loginInput') loginInput: LoginInput ) {
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

  @Protected()
  @Query(() => LogoutEntity)
  async logout(@Context('req') request: Request) {
    request.session.destroy(console.error)

    return { status: 'Success' }
  }

  @Query(() => UserEntity)
  @UseGuards(AuthenticatedGuard)
  async me(@Context('req') request: Request) {
    return request.user
  }
}

@ObjectType()
export class TestEntityV2 {
  @Field(() => Boolean)
  test!: boolean
}

