import express from "express";
import nodeRoutes from "./nodeRoutes";
const router = express.Router();

router.use("/node", nodeRoutes);
export default router;
