// controllers/base/pedidosBaseController.js
import * as service from "../../services/pedidosService.js";

export const getAll = async (req, res) => {
  try {
    const items = await service.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener pedidos", error });
  }
};

export const getById = async (req, res) => {
  try {
    const item = await service.getById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener pedido", error });
  }
};

export const create = async (req, res) => {
  try {
    const nuevo = await service.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear pedido", error });
  }
};

export const update = async (req, res) => {
  try {
    const actualizado = await service.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar pedido", error });
  }
};

export const remove = async (req, res) => {
  try {
    const eliminado = await service.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "pedido eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar pedido", error });
  }
};
