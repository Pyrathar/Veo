import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface NodeData {
  id?: number;
  name: string;
  parentId?: number;
  height?: number;
  programmingLanguage? : string;
  department? : string;
}


export const upsertNode = async (data: NodeData) => {
  const { id, name, parentId, programmingLanguage, department } = data;

  let newHeight = 0;
  if (parentId != null) {
    const parent = await prisma.node.findUnique({ where: { id: parentId } });
    if (!parent) throw new Error("Parent node not found");
    newHeight = parent.height + 1;
  }

  const node = await prisma.node.upsert({
    where: { id: id ?? 0 },
    create: {
      name,
      height: newHeight,
      parent: parentId ? { connect: { id: parentId } } : undefined,
    },
    update: {
      name,
      height: newHeight,
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

  const updateDescendantHeights = async (parentId: number, height: number) => {
    const children = await prisma.node.findMany({
      where: { parentId },
    });

    for (const child of children) {
      await prisma.node.update({
        where: { id: child.id },
        data: { height: height + 1 },
      });
      await updateDescendantHeights(child.id, height + 1);
    }
  };

  await updateDescendantHeights(node.id, newHeight);

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