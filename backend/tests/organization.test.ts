// organization.test.ts
import {
  createOrganization,
  getOrganizations,
} from "./../controllers/organizationController";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client");

// Explicitly cast the PrismaClient to jest.Mock and instantiate the mock.
const prismaMock = new (PrismaClient as jest.Mock)();

describe("Organization Service", () => {
  const { organization } = prismaMock;
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create organization", async () => {
    const data = { name: "Org1", email: "org1@example.com" };

    // Mocking the create method's resolution value.
    organization.create.mockResolvedValue(data);

    const result = await createOrganization(data);
    expect(result).toEqual(data);

    // Ensuring the mocked method is called with the correct parameters.
    expect(organization.create).toHaveBeenCalledWith({ data });
  });

  test("should fetch organizations", async () => {
    const organizations = [{ name: "Org1", email: "org1@example.com" }];

    // Mocking the findMany method's resolution value.
    organization.findMany.mockResolvedValue(organizations);

    const result = await getOrganizations();
    expect(result).toEqual(organizations);

    // Ensuring the mocked method is called.
    expect(organization.findMany).toHaveBeenCalled();
  });
});
