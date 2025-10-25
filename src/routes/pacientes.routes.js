import { Router } from "express";
import {
  obtenerPacientes,
  obtenerPaciente,
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
  vistaAsignarTurno,
  asignarTurno
} from "../controllers/pacientes.controller.js";

const router = Router();

router.get("/", obtenerPacientes);
router.get("/:id", obtenerPaciente);
router.post("/", crearPaciente);
router.put("/:id", actualizarPaciente);
router.delete("/:id", eliminarPaciente);

// NOTA: dejamos asignar-turno montado en app.js como ruta global (/asignar-turno)
// Si preferís montarlo aquí como /pacientes/asignar-turno lo cambiás.
export default router;
