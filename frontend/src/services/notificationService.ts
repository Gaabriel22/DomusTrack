import api from "../lib/api"
import { Notification } from "../types/notification"
import { AxiosError } from "axios"

// Cria uma nova notificação
export const createNotification = async (data: {
  user_id: string
  title: string
  message: string
  status?: "unread" | "read"
}) => {
  try {
    const response = await api.post("/notifications", data)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao criar notificação"
      )
    }
    throw new Error("Erro desconhecido ao criar notificação")
  }
}

// Lista todas as notificações de um usuário
export const getUserNotifications = async (user_id: string) => {
  try {
    const response = await api.get(`/notifications/${user_id}`)
    return response.data as Notification[]
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao listar notificações"
      )
    }
    throw new Error("Erro desconhecido ao listar notificações")
  }
}

// Marca uma notificação como lida
export const markAsRead = async (id: string) => {
  try {
    const response = await api.patch(`/notifications/${id}/read`)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao marcar notificação como lida"
      )
    }
    throw new Error("Erro desconhecido ao marcar notificação como lida")
  }
}

// Deleta uma notificação
export const deleteNotification = async (id: string) => {
  try {
    const response = await api.delete(`/notifications/${id}`)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao deletar notificação"
      )
    }
    throw new Error("Erro desconhecido ao deletar notificação")
  }
}

const notificationService = {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification,
}

export default notificationService
