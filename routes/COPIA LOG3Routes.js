// routes/COPIA LOG3Routes.js
import express from "express";
import {
  crearCOPIA LOG,
  obtenerCOPIA LOG3,
  obtenerCOPIA LOG,
  actualizarCOPIA LOG,
  eliminarCOPIA LOG
} from "../controllers/COPIA LOG3Controller.js";

const router = express.Router();

router.get("/", obtenerCOPIA LOG3);
router.get("/:id", obtenerCOPIA LOG);
router.post("/", crearCOPIA LOG);
router.put("/:id", actualizarCOPIA LOG);
router.delete("/:id", eliminarCOPIA LOG);

export default router;
