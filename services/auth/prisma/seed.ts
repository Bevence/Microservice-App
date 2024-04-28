import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prismaClient = new PrismaClient();

async function main() {
  const users = [
    {
      fullName: 'User One',
      email: 'user_one@mailinator.com',
      password: await bcrypt.hash('Password@123', 10),
      userName: 'user1',
    },
    {
      fullName: 'User Two',
      email: 'user_two@mailinator.com',
      password: await bcrypt.hash('Password@123', 10),
      userName: 'user2',
    },
  ];

  await prismaClient.user.createMany({
    data: users,
  });
}

main()
  .then(async () => await prismaClient.$disconnect())
  .catch(async (err) => {
    console.log('err', err);
    await prismaClient.$disconnect();
    process.exit(1);
  });
