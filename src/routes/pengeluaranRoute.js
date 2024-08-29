import express from "express";
import {
  createPengeluaran,
  deletePengeluaran,
  getAllPengeluaran,
  updatePengeluaran,
} from "../controller/pengeluaranController.js";

const router = express.Router();

router.get("/pengeluaran", getAllPengeluaran);
router.post("/pengeluaran", createPengeluaran);
router.patch("/pengeluaran/:id", updatePengeluaran);
router.delete("/pengeluaran/:id", deletePengeluaran);

export default router;
