// routes/log3Routes.js
import express from "express";
import {
  crearLog,
  obtenerLog3,
  obtenerLog,
  actualizarLog,
  eliminarLog
} from "../controllers/log3Controller.js";

const router = express.Router();

router.get("/", obtenerLog3);
router.get("/:id", obtenerLog);
router.post("/", crearLog);
router.put("/:id", actualizarLog);
router.delete("/:id", eliminarLog);

export default router;
