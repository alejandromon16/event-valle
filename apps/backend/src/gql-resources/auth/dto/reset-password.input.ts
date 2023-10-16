import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType({ description: 'Reset password input' })
export class ResetPasswordInput {
  @Field(() => String)
  @IsString()
  userId!: string

  @Field(() => String, { description: 'Password reset token to validate' })
  @IsString()
  token!: string

  @Field(() => String, { description: 'New password to update' })
  @IsString()
  newPassword!: string
}
