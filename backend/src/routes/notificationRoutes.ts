import { Router } from "express"
import notificationController from "../controllers/notificationController"

const router = Router()

// Rota para criar uma nova notificação
router.post("/create", notificationController.createNotification)

// Rota para listar todas as notificações de um usuário
router.get("/:user_id", notificationController.getUserNotifications)

// Rota para marcar uma notificação como lida
router.patch("/:id/read", notificationController.markAsRead)

// Rota para deletar uma notificação
router.delete("/:id", notificationController.deleteNotification)

export default router
