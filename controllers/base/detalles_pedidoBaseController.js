// controllers/base/detalles_pedidoBaseController.js
import * as service from "../../services/detalles_pedidoService.js";

export const getAll = async (req, res) => {
  try {
    const items = await service.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener detalles_pedido", error });
  }
};

export const getById = async (req, res) => {
  try {
    const item = await service.getById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener detalles_pedido", error });
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
    res.status(500).json({ mensaje: "Error al crear detalles_pedido", error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const actualizado = await service.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar detalles_pedido", error });
  }
};

export const remove = async (req, res) => {
  try {
    const eliminado = await service.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "detalles_pedido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar detalles_pedido", error });
  }
};
