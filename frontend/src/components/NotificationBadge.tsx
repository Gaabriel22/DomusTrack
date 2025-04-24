import React, { useState, useEffect } from "react"
import { FaBell } from "react-icons/fa"

interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  status: "unread" | "read"
}

const NotificationBadge: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState<number>(0)

  // Função para buscar as notificações não lidas do usuário
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("authToken")
      if (token) {
        const response = await fetch("/api/notifications", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (response.ok) {
          const unreadNotifications = data.filter(
            (notification: Notification) => notification.status === "unread"
          )
          setNotifications(data)
          setUnreadCount(unreadNotifications.length)
        }
      }
    } catch (error) {
      console.error("Erro ao buscar notificações:", error)
    }
  }

  // Efeito para carregar notificações quando o componente for montado
  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <div className="relative">
      <button className="relative p-2 rounded-full bg-primary text-white">
        <FaBell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>
      <div className="mt-2 text-sm">
        {unreadCount > 0
          ? `${unreadCount} nova${unreadCount > 1 ? "s" : ""} notificação${
              unreadCount > 1 ? "s" : ""
            }`
          : "Sem novas notificações"}
      </div>
    </div>
  )
}

export default NotificationBadge
