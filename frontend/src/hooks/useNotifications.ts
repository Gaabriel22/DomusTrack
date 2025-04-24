import { useContext } from "react"
import { NotificationContext } from "../contexts/NotificationContext"

export const useNotifications = () => {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      "useNotifications deve ser usado dentro de um NotificationProvider"
    )
  }

  return context
}
