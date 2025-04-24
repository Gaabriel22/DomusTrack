import { Property } from "./property"
import { Maintenance } from "./maintenance"
import { UserPropertyAccess } from "./userPropertyAccess"
import { Provider } from "./provider"

export type UserRole = "owner" | "tenant" | "manager" | "business"

export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  role: UserRole
  created_at: string
  updated_at: string
  properties: Property[]
  maintenances: Maintenance[]
  notifications: Notification[]
  user_access: UserPropertyAccess[]
  Provider: Provider[]
}
