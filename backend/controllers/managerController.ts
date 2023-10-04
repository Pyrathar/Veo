import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ManagerData {
  name: string;
  height: number;
  parentId?: number;
  department: string;
}

export const createManager = async (data: ManagerData) => {
  const node = await prisma.node.create({
    data: {
      name: data.name,
      height: data.height,
      parentId: data.parentId,
    },
  });

  return prisma.manager.create({
    data: {
      nodeId: node.id,
      department: data.department,
    },
  });
};
