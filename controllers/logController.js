// controllers/logController.js
import { sequelize } from "../config/db.js";
import log from "../models/log.js";
import { DataTypes } from "sequelize";

// 🔧 Inicializamos el modelo con la conexión activa
const Lo = log.init(sequelize, DataTypes);

// CREATE
export const crearLo = async (req, res) => {
  try {
    const nuevo = await Lo.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear log", error });
  }
};

// READ (todos)
export const obtenerLog = async (req, res) => {
  try {
    const lista = await Lo.findAll();
    res.json(lista);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener log", error });
  }
};

// READ (uno)
export const obtenerLo = async (req, res) => {
  try {
    const item = await Lo.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener log", error });
  }
};

// UPDATE
export const actualizarLo = async (req, res) => {
  try {
    const item = await Lo.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar log", error });
  }
};

// DELETE
export const eliminarLo = async (req, res) => {
  try {
    const item = await Lo.findByPk(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    await item.destroy();
    res.json({ mensaje: "Lo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar log", error });
  }
};
