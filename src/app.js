import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import { conectarDB } from "./config/db.js";
import pacientesRoutes from "./routes/pacientes.routes.js";
import turnosRoutes from "./routes/turnos.routes.js"; // opcional

import {
  vistaAsignarTurno,
  asignarTurno
} from "./controllers/pacientes.controller.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a DB
await conectarDB();

// Configuraciones
app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "src/views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

// Middlewares simples (logger) - opcional: puedes agregar el logger.js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Rutas
app.use("/pacientes", pacientesRoutes);
app.use("/turnos", turnosRoutes); // opcional

// Rutas globales para asignar turno (mantener URL limpia)
app.get("/asignar-turno", vistaAsignarTurno);
app.post("/asignar-turno", asignarTurno);

// Ruta raíz
app.get("/", (req, res) => {
  res.render("index", { titulo: "Clínica - Inicio" });
});

// Manejo básico de errores 404
app.use((req, res) => {
  res.status(404);
  if (req.accepts("html")) return res.render("error", { message: "Página no encontrada" });
  return res.json({ error: "Not found" });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
