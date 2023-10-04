import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface OrganizationData {
  name: string;
  email: string;
}

export const createOrganization = async (data: OrganizationData) => {
  try {
    return await prisma.organization.create({
      data,
    });
  } catch (error) {
    throw new Error("Failed to create organization");
  }
};

export const getOrganizations = async () => {
  try {
    return await prisma.organization.findMany();
  } catch (error) {
    throw new Error("Failed to fetch organizations");
  }
};
