// frontend/src/types/notification.ts
import { User } from "./user"

export type NotificationStatus = "unread" | "read"

export interface Notification {
  id: string
  user_id: string
  title: string
  message: string
  status: NotificationStatus
  created_at: string 
  user: User
}
