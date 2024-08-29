import express from "express";
import {
  createPenghuni,
  deletePenghuni,
  getAllPenghuni,
  updatePenghuni,
} from "../controller/penghuniController.js";

const router = express.Router();

// ROUTE GET ALL PENGHUNI
router.get("/penghuni", getAllPenghuni);
// ROUTE CREATE PENGHUNI
router.post("/penghuni", createPenghuni);
// ROUTE EDIT PENGHUNI
router.patch("/penghuni/:id", updatePenghuni);
// ROUTE DELETE PENGHUNI
router.delete("/penghuni/:id", deletePenghuni);

export default router;
