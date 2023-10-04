import express, { Request, Response } from "express";
import * as nodeController from "../controllers/nodeController";

const router = express.Router();

router.put("/", async (req: Request, res: Response) => {
  try {
    const node = await nodeController.upsertNode(
      req.body,
    );
    res.status(201).json(node);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/", async (_: Request, res: Response) => {
  try {
    const nodes = await nodeController.getNodes();
    res.status(200).json(nodes);
  } catch (error) {
    res.status(500).json({ error });
  }
});


router.get("/:id", async (req: Request, res: Response) => {
  try {
    const nodeId = parseInt(req.params.id, 10);
    if (isNaN(nodeId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    const node = await nodeController.getNodeById(nodeId);
    if (!node) {
      return res.status(404).json({ error: "Node not found" });
    }
    res.status(200).json(node);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
