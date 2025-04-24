import { Request, Response } from "express"
import notificationService from "../services/notificationService"

// Controlador para criar uma nova notificação
export const createNotification = async (req: Request, res: Response) => {
  try {
    const { user_id, title, message, status } = req.body
    const newNotification = await notificationService.createNotification({
      user_id,
      title,
      message,
      status,
    })
    res.status(201).json(newNotification)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao criar notificação" })
  }
}

// Controlador para listar notificações de um usuário
export const getUserNotifications = async (req: Request, res: Response) => {
  try {
    const { user_id } = req.params
    const notifications = await notificationService.getUserNotifications(
      user_id
    )
    res.status(200).json(notifications)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao listar notificações" })
  }
}

// Controlador para marcar uma notificação como lida
export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const updatedNotification = await notificationService.markAsRead(id)
    res.status(200).json(updatedNotification)
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Erro ao marcar notificação como lida",
    })
  }
}

// Controlador para deletar uma notificação
export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedNotification = await notificationService.deleteNotification(id)
    res.status(200).json(deletedNotification)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao deletar notificação" })
  }
}

export default {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification,
}
