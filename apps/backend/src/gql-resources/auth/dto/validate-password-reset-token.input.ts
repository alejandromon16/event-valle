import { Field, InputType } from '@nestjs/graphql'
import { IsString } from 'class-validator'

@InputType({ description: 'Validate password reset token input' })
export class ValidatePasswordResetTokenInput {
  @Field(() => String)
  @IsString()
  user_id!: string

  @Field(() => String, { description: 'Password reset token to validate' })
  @IsString()
  token!: string
}
