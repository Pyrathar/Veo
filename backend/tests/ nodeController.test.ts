import { 
  createNode, 
  getNodeById, 
  getNodes, 
  getChildrenOfNode,
  upsertNode
} from "./../controllers/nodeController";
import { clearAllData } from "../utils/cleanup";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe("NodeController", () => {
  let rootNodeId: number;

  beforeAll(async () => {
    await clearAllData();

    const rootNodeData = {
      name: "Root Node",
      height: 0,
    };

    const rootNode = await createNode(rootNodeData);
    rootNodeId = rootNode.id;
  });

  afterAll(async () => {
    await clearAllData();
  });

  describe("createNode", () => {
    it("should create a node", async () => {
      const nodeData = {
        name: "Child Node 1",
        parent: {
          connect: { id: rootNodeId },
        },
        height: 1,
      };

      const node = await createNode(nodeData);
      expect(node).toHaveProperty("id");
      expect(node.name).toBe(nodeData.name);
      expect(node.parentId).toBe(rootNodeId);
    });
  });

  describe("getNodeById", () => {
    it("should return a node by ID", async () => {
      const node = await getNodeById(rootNodeId);
      expect(node).not.toBeNull();
      expect(node!).toHaveProperty("id");
      expect(node!.id).toBe(rootNodeId);
    });
  });
  
  describe("getNodes", () => {
    it("should return a list of nodes", async () => {
      const nodes = await getNodes();
      expect(Array.isArray(nodes)).toBeTruthy();
      expect(nodes.length).toBeGreaterThan(0);
    });
  });

  describe("getChildrenOfNode", () => {
    it("should return child nodes of a given node", async () => {
      const childNodeData = {
        name: "Child Node 2",
        parent: {
          connect: { id: rootNodeId },
        },
        height: 1,
      };

      await createNode(childNodeData);
      
      const childNodes = await getChildrenOfNode(rootNodeId);
      expect(Array.isArray(childNodes)).toBeTruthy();
      expect(childNodes.length).toBeGreaterThan(0);
    });
  });

  describe('upsertNode', () => {
    it('should create a new node with developer and manager', async () => {
      const nodeData = {
        name: 'Root',
        height: 0,
        programmingLanguage: 'Python',
        department: 'Engineering',
      };

      const newNode = await upsertNode(nodeData);

      expect(newNode).toHaveProperty('id');
      expect(newNode.name).toEqual(nodeData.name);

      // Validate Developer Entry
      const developer = await prisma.developer.findUnique({
        where: { nodeId: newNode.id },
      });
      expect(developer).not.toBeNull();
      expect(developer?.programmingLanguage).toEqual(nodeData.programmingLanguage);

      // Validate Manager Entry
      const manager = await prisma.manager.findUnique({
        where: { nodeId: newNode.id },
      });
      expect(manager).not.toBeNull();
      expect(manager?.department).toEqual(nodeData.department);
    });

    it('should update the node and related developer and manager', async () => {
      const nodeData = {
        name: 'Root',
        height: 0,
        programmingLanguage: 'Python',
        department: 'Engineering',
      };

      const newNode = await upsertNode(nodeData);

      const updatedData = {
        id: newNode.id,
        name: 'Updated Root',
        height: 1,
        programmingLanguage: 'JavaScript',
        department: 'HR',
      };

      const updatedNode = await upsertNode(updatedData);

      // Validate Updated Node
      expect(updatedNode.id).toEqual(newNode.id);
      expect(updatedNode.name).toEqual(updatedData.name);
      expect(updatedNode.height).toEqual(updatedData.height);

      // Validate Updated Developer Entry
      const developer = await prisma.developer.findUnique({
        where: { nodeId: updatedNode.id },
      });
      expect(developer).not.toBeNull();
      expect(developer?.programmingLanguage).toEqual(updatedData.programmingLanguage);

      // Validate Updated Manager Entry
      const manager = await prisma.manager.findUnique({
        where: { nodeId: updatedNode.id },
      });
      expect(manager).not.toBeNull();
      expect(manager?.department).toEqual(updatedData.department);
    });
  });
});
