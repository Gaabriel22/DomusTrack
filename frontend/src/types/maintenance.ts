import { Property } from "./property"
import { Provider } from "./provider"
import { User } from "./user"
import { MaintenanceDocument } from "./maintenanceDocument"

export type MaintenanceType =
  | "electrical"
  | "plumbing"
  | "painting"
  | "cleaning"
  | "other"
export type MaintenanceStatus = "pending" | "in_progress" | "done" | "cancelled"

export interface Maintenance {
  id: string
  property_id: string
  title: string
  description: string
  type: MaintenanceType
  scheduled_date: string
  status: MaintenanceStatus
  cost?: number
  provider_id?: string
  created_by: string
  created_at: string
  updated_at: string
  property: Property
  provider?: Provider
  created_by_user: User
  documents: MaintenanceDocument[]
}
