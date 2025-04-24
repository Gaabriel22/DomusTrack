import api from "../lib/api"
import {
  Maintenance,
  MaintenanceType,
  MaintenanceStatus,
} from "../types/maintenance"
import { DocumentType, MaintenanceDocument } from "../types/maintenanceDocument"

interface CreateMaintenanceDTO {
  property_id: string
  title: string
  description: string
  type: MaintenanceType
  scheduled_date: string
  status?: MaintenanceStatus
  cost?: number
  provider_id?: string
  created_by: string
}

interface AddMaintenanceDocumentDTO {
  maintenance_id: string
  url: string
  type: DocumentType
}

export const createMaintenance = async (
  data: CreateMaintenanceDTO
): Promise<Maintenance> => {
  const response = await api.post("/maintenances", data)
  return response.data
}

export const getMaintenanceByProperty = async (
  propertyId: string
): Promise<Maintenance[]> => {
  const response = await api.get(`/maintenances/property/${propertyId}`)
  return response.data
}

export const addMaintenanceDocument = async (
  data: AddMaintenanceDocumentDTO
): Promise<MaintenanceDocument> => {
  const response = await api.post("/maintenances/documents", data)
  return response.data
}

const maintenanceService = {
  createMaintenance,
  getMaintenanceByProperty,
  addMaintenanceDocument,
}

export default maintenanceService
