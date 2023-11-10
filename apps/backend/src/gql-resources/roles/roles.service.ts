import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/services/database/prisma.service';
import { AssignRolesToUserInput } from './dto/assignRolesToUser.input';
import { CreateRoleInput } from './dto/createRol.input';
import { FindRoleByNameInput } from './dto/findRoleByName.input';
import { RoleEntity } from './entities/rol.entity';

@Injectable()
export class RolesService {
  constructor(
    private readonly prisma: PrismaService,
  ){}

  async create(createRoleInput: CreateRoleInput): Promise<RoleEntity> {
    const role = await this.prisma.role.create({
      data: createRoleInput,
      include: { users: true}
    })
    return role;
  }

  async list(): Promise<RoleEntity[]> {
    const roles = await this.prisma.role.findMany({
      include: { users: true}
    })

    return roles;
  }

  async findRoleByName(findRoleByNameInput :FindRoleByNameInput) {
    return await this.prisma.role.findUniqueOrThrow({
      where: {
        name: findRoleByNameInput.name
      },
      include: { users: true}
    });
  }

  async assignRolesToUser(assignRolestoUserInput: AssignRolesToUserInput) {
    let user;

    for (const roleName of assignRolestoUserInput.roles) {
      const role = await this.prisma.role.findUnique({
        where: {
          name: roleName
        }
      });

      if (role) {
        user = await this.prisma.user.update({
          where: { id: assignRolestoUserInput.userId },
          data: {
            roles: {
              connect: { id: role.id }
            }
          }
        });
      } else {
        throw new Error(`Role '${roleName}' not found.`);
      }
    }
    return user;
  }
}
