import express from "express";
import {
  createRumah,
  deleteRumah,
  getAllRumah,
  updateRumah,
} from "../controller/rumahController.js";

const router = express.Router();

// ROUTE GET ALL RUMAH
router.get("/rumah", getAllRumah);
// ROUTE CREATE RUMAH
router.post("/rumah", createRumah);
// ROUTE EDIT RUMAH
router.patch("/rumah/:id", updateRumah);
// ROUTE DELETE RUMAH
router.delete("/rumah/:id", deleteRumah);

export default router;
