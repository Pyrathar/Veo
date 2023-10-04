import { 
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

    const rootNode = await upsertNode(rootNodeData);
    rootNodeId = rootNode.id;
  });

  afterAll(async () => {
    await clearAllData();
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
        name: "Child Node 1",
        parentId: rootNodeId
      };

      const childNode2Data = {
        name: "Child Node 2",
        parentId: rootNodeId
      };

      await upsertNode(childNodeData);
      await upsertNode(childNode2Data);

      
      const childNodes = await getChildrenOfNode(rootNodeId);
      expect(Array.isArray(childNodes)).toBeTruthy();
      expect(childNodes.length).toBe(2);
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
        programmingLanguage: 'Python',
        department: 'Engineering',
      };

      const newNode = await upsertNode(nodeData);

      const updatedData = {
        id: newNode.id,
        name: 'Updated Root',
        programmingLanguage: 'JavaScript',
        department: 'HR',
      };

      const updatedNode = await upsertNode(updatedData);

      // Validate Updated Node
      expect(updatedNode.id).toEqual(newNode.id);
      expect(updatedNode.name).toEqual(updatedData.name);

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

    it("should create a root node when parentId is not provided", async () => {
      const nodeData = {
        name: "Root Node",
      };
  
      const newNode = await upsertNode(nodeData);
  
      expect(newNode).toHaveProperty("id");
      expect(newNode.name).toBe(nodeData.name);
      expect(newNode.height).toBe(0);
    });
  
    it("should create a child node with height incremented by 1 compared to parent", async () => {
      const parentNode = await upsertNode({ name: "Parent Node" });
  
      const childNodeData = {
        name: "Child Node",
        parentId: parentNode.id,
      };
  
      const childNode = await upsertNode(childNodeData);
  
      expect(childNode).toHaveProperty("id");
      expect(childNode.name).toBe(childNodeData.name);
      expect(childNode.height).toBe(parentNode.height + 1);
    });
  
    it("should adjust the height of nodes when moving to a new parent", async () => {
      const initialParent = await upsertNode({ name: "Initial Parent" });
      const newParent = await upsertNode({ name: "New Parent" });
  
      const nodeToMove = await upsertNode({
        name: "Moving Node",
        parentId: initialParent.id,
      });
  
      // Move to new parent
      const movedNode = await upsertNode({
        id: nodeToMove.id,
        name: nodeToMove.name,
        parentId: newParent.id,
      });
  
      expect(movedNode).toHaveProperty("id");
      expect(movedNode.parentId).toBe(newParent.id);
      expect(movedNode.height).toBe(newParent.height + 1);
    });
  });
});
