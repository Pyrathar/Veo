import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface NodeData {
  name: string;
  parentId?: number;
  height: number;
}

export const createNode = async (data: NodeData) => {
  return prisma.node.create({
    data,
  });
};

export const upsertNode = async (data: NodeData) => {
  return prisma.node.create({
    data,
  });
};


export const getNodeById = async (id: number) => {
  return prisma.node.findUnique({
    where: { id },
  });
};

export const getNodes = async () => {
  return prisma.node.findMany();
};

export const getChildrenOfNode = async (id: number) => {
  return prisma.node.findMany({
    where: { parentId: id },
  });
};