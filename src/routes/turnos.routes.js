import { Router } from "express";
import { listarTurnos, crearTurno } from "../controllers/turnos.controller.js";

const router = Router();

router.get("/", listarTurnos);
router.post("/", crearTurno);

export default router;
