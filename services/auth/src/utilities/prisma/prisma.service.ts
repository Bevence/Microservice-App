import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

function extendedPrismaClient() {
  const client = () =>
    new PrismaClient().$extends({
      query: {
        user: {
          async create({ model: _model, operation: _operation, args, query }) {
            args.data.password = await bcrypt.hash(args.data.password, 10);
            return query(args);
          },
        },
      },
    });

  return class {
    // wrapper with type-safety 🎉
    constructor() {
      return client();
    }
  } as new () => ReturnType<typeof client>;
}

@Injectable()
export class PrismaService
  extends extendedPrismaClient()
  implements OnModuleInit
{
  async onModuleInit() {
    await this.$connect();
  }
}
