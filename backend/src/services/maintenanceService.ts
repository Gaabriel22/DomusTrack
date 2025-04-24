import maintenanceModel from "../models/maintenanceModel"

type MaintenanceType =
  | "electrical"
  | "plumbing"
  | "painting"
  | "cleaning"
  | "other"
type MaintenanceStatus = "pending" | "in_progress" | "done" | "cancelled"
type DocumentType = "invoice" | "photo" | "other"

type CreateMaintenanceDTO = {
  property_id: string
  title: string
  description: string
  type: MaintenanceType
  scheduled_date: Date
  status?: MaintenanceStatus
  cost?: number
  provider_id?: string
  created_by: string
}

type AddMaintenanceDocumentDTO = {
  maintenance_id: string
  url: string
  type: DocumentType
}

// Cria uma nova manutenção.
export const createMaintenance = async (data: CreateMaintenanceDTO) => {
  if (
    !data.property_id ||
    !data.title ||
    !data.description ||
    !data.type ||
    !data.scheduled_date ||
    !data.created_by
  ) {
    throw new Error("Dados obrigatórios ausentes para criar manutenção.")
  }

  return await maintenanceModel.createMaintenance(data)
}

// Lista manutenções de uma propriedade.
export const getMaintenanceByProperty = async (propertyId: string) => {
  if (!propertyId) {
    throw new Error("ID da propriedade é obrigatório.")
  }

  return await maintenanceModel.getMaintenanceByProperty(propertyId)
}

// Adiciona um documento a uma manutenção.
export const addMaintenanceDocument = async (
  data: AddMaintenanceDocumentDTO
) => {
  if (!data.maintenance_id || !data.url || !data.type) {
    throw new Error(
      "Dados obrigatórios para adicionar documento de manutenção ausentes."
    )
  }

  return await maintenanceModel.addMaintenanceDocument(data)
}

export default {
  createMaintenance,
  getMaintenanceByProperty,
  addMaintenanceDocument,
}
