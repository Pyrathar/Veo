import express from "express";
import organizationRoutes from "./organizationRoutes";
const router = express.Router();

router.use("/organizations", organizationRoutes);
export default router;
