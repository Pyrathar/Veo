import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const clearAllData = async () => {
  await prisma.node.deleteMany();
  await prisma.developer.deleteMany();
  await prisma.manager.deleteMany();
};
