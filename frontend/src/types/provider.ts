import { Maintenance } from "./maintenance"
import { User } from "./user"

export type ServiceType = "electrician" | "plumber" | "cleaning" | "general"

export interface Provider {
  id: string
  name: string
  phone: string
  email: string
  service_type: ServiceType
  created_by: string
  created_at: string 
  created_by_user: User
  maintenances: Maintenance[] 
}
