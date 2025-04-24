import { User } from "./user"
import { Property } from "./property"

export type AccessLevel = "view" | "edit" | "admin"

export interface UserPropertyAccess {
  id: string
  user_id: string
  property_id: string
  access_level: AccessLevel
  created_at: string 
  user: User 
  property: Property 
}
