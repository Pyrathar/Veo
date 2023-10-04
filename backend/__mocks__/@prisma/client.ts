export const PrismaClientMock = {
  organization: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
};

export const PrismaClient = jest.fn(() => PrismaClientMock);
