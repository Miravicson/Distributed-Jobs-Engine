import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma-clients/sm-auth';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        ...data,
        password: await hash(data.password, {}),
      },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async getUser(args: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUniqueOrThrow({ where: args });
  }
}
