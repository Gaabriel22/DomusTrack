import notificationModel from "../models/notificationModel"

type NotificationStatus = "unread" | "read"

// Tipo DTO para criação de notificação
type CreateNotificationDTO = {
  user_id: string
  title: string
  message: string
  status?: NotificationStatus
}

// Tipo DTO para atualizar a notificação (marcar como lida)
type UpdateNotificationDTO = {
  status: NotificationStatus
}

// Cria uma nova notificação
export const createNotification = async (data: CreateNotificationDTO) => {
  if (!data.user_id || !data.title || !data.message) {
    throw new Error("Os campos user_id, title e message são obrigatórios.")
  }

  return await notificationModel.createNotification(data)
}

// Lista todas as notificações de um usuário
export const getUserNotifications = async (user_id: string) => {
  if (!user_id) {
    throw new Error("user_id é obrigatório.")
  }

  return await notificationModel.getUserNotifications(user_id)
}

// Marca uma notificação como lida
export const markAsRead = async (id: string) => {
  if (!id) {
    throw new Error("ID da notificação é obrigatório.")
  }

  return await notificationModel.markAsRead(id)
}

// Deleta uma notificação
export const deleteNotification = async (id: string) => {
  if (!id) {
    throw new Error("ID da notificação é obrigatório.")
  }

  return await notificationModel.deleteNotification(id)
}

export default {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification,
}
