import { Field, InputType } from '@nestjs/graphql'
import { TransformLowercase } from '../../../common/decorators/transformers/transform-lowercase.decorator'
import { IsEmail, IsString } from 'class-validator'

@InputType({ description: 'Login user input' })
export class LoginInput {
  @Field(() => String, { description: 'Email of the user' })
  @TransformLowercase()
  @IsEmail()
  email!: string

  @Field(() => String, { description: 'Password of the user' })
  @IsString()
  password!: string
}
