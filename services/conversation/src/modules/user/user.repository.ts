import { PrismaClient, User } from "@prisma/client";

const prismaClient = new PrismaClient();

const consumeUser = ({ id, email, fullName, userName }: User) => {
  return prismaClient.user.upsert({
    where: { id: id },
    create: { id, email, fullName, userName },
    update: { email, fullName, userName },
  });
};

export const userRepository = {
  consumeUser,
};
