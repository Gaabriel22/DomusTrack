import { Router } from "express"
import authController from "../controllers/authController"

const router = Router()

// Rota para registro de usuário
router.post("/register", authController.register)

// Rota para login de usuário
router.post("/login", authController.login)

// Rota para verificação do JWT
router.get("/verify", authController.verify)

export default router
