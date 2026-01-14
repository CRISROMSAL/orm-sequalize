// routes/log14Routes.js
import express from "express";
import {
  crearLog1,
  obtenerLog14,
  obtenerLog1,
  actualizarLog1,
  eliminarLog1
} from "../controllers/log14Controller.js";

const router = express.Router();

router.get("/", obtenerLog14);
router.get("/:id", obtenerLog1);
router.post("/", crearLog1);
router.put("/:id", actualizarLog1);
router.delete("/:id", eliminarLog1);

export default router;
