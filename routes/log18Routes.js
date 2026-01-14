// routes/log18Routes.js
import express from "express";
import {
  crearLog1,
  obtenerLog18,
  obtenerLog1,
  actualizarLog1,
  eliminarLog1
} from "../controllers/log18Controller.js";

const router = express.Router();

router.get("/", obtenerLog18);
router.get("/:id", obtenerLog1);
router.post("/", crearLog1);
router.put("/:id", actualizarLog1);
router.delete("/:id", eliminarLog1);

export default router;
