import express from "express";
const router = express.Router();
import { hotSellingController } from "../controllers";

router.get("/", hotSellingController.handleGetHotSellingBusinesses);

export = router;
