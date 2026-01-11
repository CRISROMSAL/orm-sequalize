// controllers/base/clientesBaseController.js
import * as service from "../../services/clientesService.js";

export const getAll = async (req, res) => {
  try {
    const items = await service.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener clientes", error });
  }
};

export const getById = async (req, res) => {
  try {
    const item = await service.getById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener cliente", error });
  }
};

export const create = async (req, res) => {
  try {
    console.log("🚀 Controlador: Llamando al servicio create..."); // Añade esto
    const nuevo = await service.create(req.body);
    console.log("✅ Controlador: Respuesta recibida del servicio"); // Añade esto
    res.status(201).json(nuevo);
  } catch (error) {
    console.log("❌ ERROR EN CONTROLADOR:", error); // Añade esto
    res.status(500).json({ mensaje: "Error al crear cliente", error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const actualizado = await service.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar cliente", error });
  }
};

export const remove = async (req, res) => {
  try {
    const eliminado = await service.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar cliente", error });
  }
};
