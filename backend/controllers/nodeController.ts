import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface NodeData {
  id?: number;
  name: string;
  parentId?: number;
  height: number;
  programmingLanguage? : string;
  department? : string;
}

export const createNode = async (data: NodeData) => {
  return prisma.node.create({
    data,
  });
};

export const upsertNode = async (data: NodeData) => {
  const { id, name, height, parentId, programmingLanguage, department } = data;

  const node = await prisma.node.upsert({
    where: { id: id ?? 0 },
    create: {
      name,
      height,
      parent: parentId ? { connect: { id: parentId } } : undefined,
    },
    update: {
      name,
      height,
      parent: parentId ? { connect: { id: parentId } } : undefined,
    },
  });

  if (programmingLanguage) {
    await prisma.developer.upsert({
      where: { nodeId: node.id },
      create: {
        programmingLanguage,
        nodeId: node.id,
      },
      update: {
        programmingLanguage,
      },
    });
  }

  if (department) {
    await prisma.manager.upsert({
      where: { nodeId: node.id },
      create: {
        department,
        nodeId: node.id,
      },
      update: {
        department,
      },
    });
  }

  return node;
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