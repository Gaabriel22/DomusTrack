import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Tipos baseados no enum NotificationStatus e no model Notification
type NotificationStatus = "unread" | "read"

type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  status: NotificationStatus
  created_at: Date
}

// Cria uma nova notificação
export const createNotification = async (data: {
  user_id: string
  title: string
  message: string
  status?: NotificationStatus
}): Promise<Notification> => {
  try {
    return (await prisma.notification.create({
      data: {
        ...data,
        status: data.status ?? "unread",
      },
    })) as Notification
  } catch (error) {
    throw new Error(
      "Erro ao criar notificação: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Lista todas as notificações de um usuário
export const getUserNotifications = async (
  user_id: string
): Promise<Notification[]> => {
  try {
    return (await prisma.notification.findMany({
      where: { user_id },
      orderBy: { created_at: "desc" },
    })) as Notification[]
  } catch (error) {
    throw new Error(
      "Erro ao buscar notificações do usuário: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Marca uma notificação como lida
export const markAsRead = async (id: string): Promise<Notification> => {
  try {
    return (await prisma.notification.update({
      where: { id },
      data: { status: "read" },
    })) as Notification
  } catch (error) {
    throw new Error(
      "Erro ao marcar notificação como lida: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Deleta uma notificação
export const deleteNotification = async (id: string): Promise<Notification> => {
  try {
    return (await prisma.notification.delete({ where: { id } })) as Notification
  } catch (error) {
    throw new Error(
      "Erro ao deletar notificação: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

export default {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification,
}
