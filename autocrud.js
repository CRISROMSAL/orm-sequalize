// autocrud.js
import fs from "fs";
import path from "path";

const modelsPath = "./models";
const controllersPath = "./controllers";
const controllersBasePath = "./controllers/base"; 
const servicesPath = "./services"; 
const routesPath = "./routes";

fs.mkdirSync(controllersPath, { recursive: true });
fs.mkdirSync(controllersBasePath, { recursive: true });
fs.mkdirSync(servicesPath, { recursive: true });
fs.mkdirSync(routesPath, { recursive: true });

const models = fs.readdirSync(modelsPath)
  .filter(f => f.endsWith(".js") && f !== "init-models.js");

for (const modelFile of models) {
  const modelName = path.basename(modelFile, ".js"); 
  const modelClass = modelName.charAt(0).toUpperCase() + modelName.slice(1); 
  const singular = modelName.replace(/s$/, ""); 

// ---------- SERVICIO FINAL ----------
const serviceContent = `// services/${modelName}Service.js
import { sequelize } from "../config/db.js";

export const getAll = async () => await sequelize.models.${modelName}.findAll();
export const getById = async (id) => await sequelize.models.${modelName}.findByPk(id);

export const create = async (data) => {
    try {
        console.log("🚀 [DEBUG] Iniciando proceso de creación...");
        const nuevo = await sequelize.models.${modelName}.create(data);
        console.log("✅ [DEBUG] Registro creado con éxito.");

        // Intentamos el log con un nombre de modelo flexible
        const LogTable = sequelize.models.log || sequelize.models.logs;
        if (LogTable) {
            await LogTable.create({ log: "Creación en ${modelName} ID: " + nuevo.id });
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
    const item = await sequelize.models.${modelName}.findByPk(id);
    return item ? await item.update(data) : null;
};

export const remove = async (id) => {
    const item = await sequelize.models.${modelName}.findByPk(id);
    if (!item) return null;
    await item.destroy();
    return true;
};
`;
  fs.writeFileSync(`${servicesPath}/${modelName}Service.js`, serviceContent);

  // ---------- CONTROLADOR BASE ----------
  const baseControllerContent = `// controllers/base/${modelName}BaseController.js
import * as service from "../../services/${modelName}Service.js";

export const getAll = async (req, res) => {
  try {
    const items = await service.getAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener ${modelName}", error });
  }
};

export const getById = async (req, res) => {
  try {
    const item = await service.getById(req.params.id);
    if (!item) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener ${singular}", error });
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
    res.status(500).json({ mensaje: "Error al crear ${singular}", error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const actualizado = await service.update(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar ${singular}", error });
  }
};

export const remove = async (req, res) => {
  try {
    const eliminado = await service.remove(req.params.id);
    if (!eliminado) return res.status(404).json({ mensaje: "No encontrado" });
    res.json({ mensaje: "${singular} eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar ${singular}", error });
  }
};
`;

  fs.writeFileSync(`${controllersBasePath}/${modelName}BaseController.js`, baseControllerContent);

  // ---------- CONTROLADOR EXTENDIDO ----------
  const controllerPath = `${controllersPath}/${modelName}Controller.js`;
  if (!fs.existsSync(controllerPath)) {
    const controllerContent = `// controllers/${modelName}Controller.js
import * as Base from "./base/${modelName}BaseController.js";

export const obtener${modelClass} = Base.getAll;
export const obtener${modelClass.slice(0, -1)} = Base.getById;
export const crear${modelClass.slice(0, -1)} = Base.create;
export const actualizar${modelClass.slice(0, -1)} = Base.update;
export const eliminar${modelClass.slice(0, -1)} = Base.remove;
`;
    fs.writeFileSync(controllerPath, controllerContent);
  }

  // ---------- RUTA ----------
  const routeContent = `// routes/${modelName}Routes.js
import express from "express";
import {
  crear${modelClass.slice(0, -1)},
  obtener${modelClass},
  obtener${modelClass.slice(0, -1)},
  actualizar${modelClass.slice(0, -1)},
  eliminar${modelClass.slice(0, -1)}
} from "../controllers/${modelName}Controller.js";

const router = express.Router();

router.get("/", obtener${modelClass});
router.get("/:id", obtener${modelClass.slice(0, -1)});
router.post("/", crear${modelClass.slice(0, -1)});
router.put("/:id", actualizar${modelClass.slice(0, -1)});
router.delete("/:id", eliminar${modelClass.slice(0, -1)});

export default router;
`;

  fs.writeFileSync(`${routesPath}/${modelName}Routes.js`, routeContent);
  console.log(`✅ Estructura MVC completa generada para: ${modelName}`);
}

console.log("🎉 Todos los controladores, servicios y rutas han sido generados correctamente.");