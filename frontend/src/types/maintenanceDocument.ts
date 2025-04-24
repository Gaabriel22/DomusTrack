import { Maintenance } from "./maintenance"

export type DocumentType = "invoice" | "photo" | "other"

export interface MaintenanceDocument {
  id: string
  maintenance_id: string
  url: string
  type: DocumentType
  uploaded_at: string 
  maintenance: Maintenance
}
