import { Router } from "express";
import { loginUsuario, logoutUsuario } from "../controllers/auth.controller.js";

const router = Router();

// login
router.post("/login", loginUsuario);

// logout
router.post("/logout", logoutUsuario);

export default router;
