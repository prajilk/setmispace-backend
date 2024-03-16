import express from "express";
const router = express.Router();
import { contactController } from "../controllers";

router.post("/", contactController.handleNewContact);

export = router;
