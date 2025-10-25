import express from "express";
import pacientesRoutes from "./pacientes.routes.js";
import turnosRoutes from "./turnos.routes.js";
import usuarioRoutes from "./usuario.routes.js";
import authRoutes from "./auth.routes.js";
import medicoRoutes  from "./medico.routes.js"

const router = express.Router();

// Rutas raiz
router.get("/", (req, res) => {
  res.render("index", { titulo: "Clínica - Inicio" });
});

//  API 
router.use("/pacientes", pacientesRoutes);  //  pacientes + asignar turno
router.use("/turnos", turnosRoutes);        
router.use("/usuarios", usuarioRoutes);     
router.use("/auth", authRoutes);            // login
router.use("/medicos", medicoRoutes);     


export default router;
