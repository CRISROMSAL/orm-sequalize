// controllers/log18Controller.js
import * as Base from "./base/log18BaseController.js";

// Aquí puedes añadir lógica personalizada. Si no, simplemente exportas lo del Base.
export const obtenerLog18 = Base.getAll;
export const obtenerLog1 = Base.getById;
export const crearLog1 = Base.create;
export const actualizarLog1 = Base.update;
export const eliminarLog1 = Base.remove;
