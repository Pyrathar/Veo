import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const clearAllData = async () => {
  await prisma.developer.deleteMany();
  await prisma.manager.deleteMany();
  await prisma.node.deleteMany();
};
