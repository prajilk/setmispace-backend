import express from "express";
const router = express.Router();
import { businessController } from "../controllers";

router.get("/", businessController.handleGetAllBusinesses);
router.get("/latest", businessController.handleGetLatestBusinesses);
router.get("/features", businessController.handleGetAllFeatures);
router.get("/categories", businessController.handleGetAllCategories);
router.get("/:id", businessController.handleGetBusiness);

router.post("/new", businessController.handleCreateBusiness);

export = router;
