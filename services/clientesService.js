// services/clientesService.js
import { sequelize } from "../config/db.js";

export const getAll = async () => await sequelize.models.clientes.findAll();
export const getById = async (id) => await sequelize.models.clientes.findByPk(id);

export const create = async (data) => {
    try {
        console.log("🚀 [DEBUG] Iniciando proceso de creación...");
        const nuevo = await sequelize.models.clientes.create(data);
        console.log("✅ [DEBUG] Registro creado con éxito.");

        // Intentamos el log con un nombre de modelo flexible
        const LogTable = sequelize.models.log || sequelize.models.logs;
        if (LogTable) {
            await LogTable.create({ log: "Creación en clientes ID: " + nuevo.id });
            console.log("📜 [DEBUG] Log registrado en la tabla log.");
        } else {
            console.log("⚠️ [DEBUG] No se encontró el modelo 'log' para registrar la acción.");
        }
        return nuevo;
    } catch (error) {
        console.error("❌ [ERROR SERVICIO]:", error.message);
        throw error;
    }
};

export const update = async (id, data) => {
    const item = await sequelize.models.clientes.findByPk(id);
    return item ? await item.update(data) : null;
};

export const remove = async (id) => {
    const item = await sequelize.models.clientes.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
};
