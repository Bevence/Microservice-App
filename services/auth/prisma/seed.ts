import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

async function main() {
  const users = [
    {
      fullName: 'User One',
      email: 'user_one@mailinator.com',
      password: 'Password@123',
      userName: 'user1',
    },
    {
      fullName: 'User Two',
      email: 'user_two@mailinator.com',
      password: 'Password@123',
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
