import express, { Request, Response } from "express";
import * as organizationController from "./../controllers/organizationController";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const organization = await organizationController.createOrganization(
      req.body,
    );
    res.status(201).json(organization);
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get("/", async (_: Request, res: Response) => {
  try {
    const organizations = await organizationController.getOrganizations();
    res.status(200).json(organizations);
  } catch (error) {
    res.status(500).json({ error });
  }
});

// ... other routes related to orgs

export default router;
