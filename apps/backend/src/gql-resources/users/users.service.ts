import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { PrismaService } from '../../common/services/database/prisma.service'
import { hash, compare } from 'bcrypt'
import { UserEntity } from './entities/user.entity'
import { SALT_ROUNDS } from '../../common/constants/salt.constants'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput): Promise<UserEntity> {
    const hashedPassword = await hash(createUserInput.password, SALT_ROUNDS)

    const user = await this.prisma.user.create({
      data: {
        ...createUserInput,
        password: hashedPassword,
        notificationPreference: {
          create:{
            whatsapp: false,
            email: true
          }
        }
      },
      include: { roles: true, notificationPreference: true}
    })

    return user
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: {
      email
    },
    include: { roles: true}
  });
    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }

  async list(): Promise<UserEntity[]> {
    const user = await this.prisma.user.findMany({
      include: { roles: true, notificationPreference: true},
    })

    return user
  }

  async retrieve(id: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUniqueOrThrow({ where: { id }, include: { roles: true} })

    return user
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const hashedPassword = updateUserInput.password
      ? await hash(updateUserInput.password, SALT_ROUNDS)
      : undefined

    const user = await this.prisma.user.update({
      where: { id },
      data: { ...updateUserInput, password: hashedPassword },
    })

    return user
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({ where: { id } })

    return user
  }

  async getUser(args: Partial<UserEntity>) {
    const user = await this.prisma.user.findUnique({
      where:{ ...args},
      include: { roles: true, notificationPreference: true }
    })

    return user;
  }
}
