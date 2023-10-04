// tests/integration/nodeController.test.ts

import { 
  createNode, 
  getNodeById, 
  getNodes, 
  getChildrenOfNode 
} from "./../controllers/nodeController";
import { clearAllData } from "../utils/cleanup";
import { Prisma } from "@prisma/client";

describe("NodeController", () => {
  let rootNodeId: number;

  beforeAll(async () => {
    await clearAllData();

    const rootNodeData: Prisma.NodeCreateInput = {
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
      const nodeData: Prisma.NodeCreateInput = {
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
      const childNodeData: Prisma.NodeCreateInput = {
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
});
