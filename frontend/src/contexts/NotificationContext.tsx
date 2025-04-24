import React, { createContext, useState, useContext, ReactNode } from "react"
import notificationService from "../services/notificationService"
import { Notification } from "../types/notification"

interface NotificationContextType {
  notifications: Notification[]
  isLoading: boolean
  createNotification: (
    user_id: string,
    title: string,
    message: string
  ) => Promise<void>
  getUserNotifications: (user_id: string) => Promise<void>
  markAsRead: (id: string) => Promise<void>
  deleteNotification: (id: string) => Promise<void>
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
)

interface NotificationProviderProps {
  children: ReactNode
}

// Provider para o contexto de notificações
export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Função para criar uma nova notificação
  const createNotification = async (
    user_id: string,
    title: string,
    message: string
  ) => {
    try {
      await notificationService.createNotification({ user_id, title, message })
      await getUserNotifications(user_id) // Atualiza as notificações após criar
    } catch (error) {
      console.error("Erro ao criar notificação:", error)
    }
  }

  // Função para obter notificações de um usuário
  const getUserNotifications = async (user_id: string) => {
    setIsLoading(true)
    try {
      const notificationsData = await notificationService.getUserNotifications(
        user_id
      )
      setNotifications(notificationsData)
    } catch (error) {
      console.error("Erro ao listar notificações:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para marcar uma notificação como lida
  const markAsRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id)
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, status: "read" }
            : notification
        )
      )
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error)
    }
  }

  // Função para deletar uma notificação
  const deleteNotification = async (id: string) => {
    try {
      await notificationService.deleteNotification(id)
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      )
    } catch (error) {
      console.error("Erro ao deletar notificação:", error)
    }
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        isLoading,
        createNotification,
        getUserNotifications,
        markAsRead,
        deleteNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

// Hook para acessar o contexto de notificações
export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      "useNotification deve ser usado dentro de um NotificationProvider"
    )
  }
  return context
}
