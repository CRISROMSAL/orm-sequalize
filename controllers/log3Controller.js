// controllers/log3Controller.js
import * as Base from "./base/log3BaseController.js";

// Aquí puedes añadir lógica personalizada. Si no, simplemente exportas lo del Base.
export const obtenerLog3 = Base.getAll;
export const obtenerLog = Base.getById;
export const crearLog = Base.create;
export const actualizarLog = Base.update;
export const eliminarLog = Base.remove;
