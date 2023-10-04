import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface DeveloperData {
  name: string;
  height: number;
  parentId?: number;
  programmingLanguage: string;
}

export const createDeveloper = async (data: DeveloperData) => {
  const node = await prisma.node.create({
    data: {
      name: data.name,
      height: data.height,
      parentId: data.parentId,
    },
  });

  return prisma.developer.create({
    data: {
      nodeId: node.id,
      programmingLanguage: data.programmingLanguage,
    },
  });
};
