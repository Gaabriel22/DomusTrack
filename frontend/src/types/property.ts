import { User } from "./user"
import { Maintenance } from "./maintenance"
import { UserPropertyAccess } from "./userPropertyAccess"

export type PropertyStatus = "active" | "inactive" | "under_maintenance"

export interface Property {
  id: string
  owner_id: string
  name: string
  address: string
  status: PropertyStatus
  created_at: string 
  updated_at: string 
  owner: User 
  user_access: UserPropertyAccess[]
  maintenances: Maintenance[]
}
