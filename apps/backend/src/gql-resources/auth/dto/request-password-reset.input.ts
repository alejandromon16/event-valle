import { Field, InputType } from '@nestjs/graphql'
import { IsEmail } from 'class-validator'
import { TransformLowercase } from '../../../common/decorators/transformers/transform-lowercase.decorator'

@InputType({ description: 'Reset password input' })
export class RequestPasswordResetInput {
  @Field(() => String, { description: 'Email of the user' })
  @TransformLowercase()
  @IsEmail()
  email!: string
}
