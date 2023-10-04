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

// ... other routes related to orgs

export default router;
