// routes/carlos46Routes.js
import express from "express";
import {
  crearCarlos4,
  obtenerCarlos46,
  obtenerCarlos4,
  actualizarCarlos4,
  eliminarCarlos4
} from "../controllers/carlos46Controller.js";

const router = express.Router();

router.get("/", obtenerCarlos46);
router.get("/:id", obtenerCarlos4);
router.post("/", crearCarlos4);
router.put("/:id", actualizarCarlos4);
router.delete("/:id", eliminarCarlos4);

export default router;
