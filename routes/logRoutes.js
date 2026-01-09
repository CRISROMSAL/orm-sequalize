// routes/logRoutes.js
import express from "express";
import {
  crearLo,
  obtenerLog,
  obtenerLo,
  actualizarLo,
  eliminarLo
} from "../controllers/logController.js";

const router = express.Router();

router.get("/", obtenerLog);
router.get("/:id", obtenerLo);
router.post("/", crearLo);
router.put("/:id", actualizarLo);
router.delete("/:id", eliminarLo);

export default router;
