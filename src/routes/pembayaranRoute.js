import express from "express";
import {
  createPembayaran,
  deletePembayaran,
  getALlPembayaran,
  updatePembayaran,
} from "../controller/pembayaranController.js";

const router = express.Router();

// ROUTE GET ALL pembayaran
router.get("/pembayaran", getALlPembayaran);
// ROUTE CREATE pembayaran
router.post("/pembayaran", createPembayaran);
// ROUTE EDIT pembayaran
router.patch("/pembayaran/:id", updatePembayaran);
// ROUTE DELETE pembayaran
router.delete("/pembayaran/:id", deletePembayaran);

export default router;
