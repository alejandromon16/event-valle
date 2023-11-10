import {
  Field,
  ObjectType,
} from '@nestjs/graphql'
import { Role } from '@prisma/client'
import { RoleEntity } from '../../roles/entities/rol.entity'


@ObjectType()
export class UserEntity {
  @Field(() => String)
  id!: string

  @Field(() => String, {nullable: true})
  createdAt!: Date

  @Field(() => String, {nullable: true})
  updatedAt!: Date

  @Field(() => String)
  name!: string

  @Field(() => String)
  last_name!: string

  @Field(() => String, { nullable: true })
  phone_number!: string | null

  @Field(() => String)
  user_name!: string;

  @Field(() => String)
  email!: string

  @Field(() => String, { nullable: true,})
  password!: string

  @Field(() => [RoleEntity], { defaultValue: []})
  roles: Role[]

}
