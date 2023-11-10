import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoleType } from '@prisma/client';
import { UserEntity } from '../users/entities/user.entity';
import { AssignRolesToUserInput } from './dto/assignRolesToUser.input';
import { CreateRoleInput } from './dto/createRol.input';
import { FindRoleByNameInput } from './dto/findRoleByName.input';
import { RoleEntity } from './entities/rol.entity';
import { RolesService } from './roles.service';


@Resolver(() => RoleEntity)
export class RolesResolver {
  constructor(
    private readonly rolesService: RolesService,
    ) {}

  @Mutation(() => RoleEntity)
  createRole(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.create(createRoleInput)
  }

  @Query(() => [RoleEntity])
  rolesList(){
    return this.rolesService.list();
  }

  @Query(() => RoleEntity)
  findRoleByName(@Args('findRoleByName') findRoleByName: FindRoleByNameInput){
    return this.rolesService.findRoleByName(findRoleByName);
  }

  @Mutation(() => UserEntity)
  assignRolesToUser(@Args('assignRolesToUser') assignRolesToUserInput: AssignRolesToUserInput){
    return this.rolesService.assignRolesToUser(assignRolesToUserInput)
  }
}
