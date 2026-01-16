// services/carlos46Service.js
import carlos46 from "../models/carlos46.js";
import { sequelize } from "../config/db.js";
import { DataTypes } from "sequelize";

// Inicializamos el modelo (necesario si no se hizo en init-models)
const Model = carlos46.init(sequelize, DataTypes);

export const getAll = async () => await Model.findAll();
export const getById = async (id) => await Model.findByPk(id);
export const create = async (data) => await Model.create(data);
export const update = async (id, data) => {
    const item = await Model.findByPk(id);
    if (!item) return null;
    return await item.update(data);
};
export const remove = async (id) => {
    const item = await Model.findByPk(id);
    if (!item) return null;
    return await item.destroy();
};
