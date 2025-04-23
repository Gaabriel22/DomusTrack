import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Cria uma nova manutenção
export const createMaintenance = async (data: {
  property_id: string
  title: string
  description: string
  type: "electrical" | "plumbing" | "painting" | "cleaning" | "other"
  scheduled_date: Date
  status?: "pending" | "in_progress" | "done" | "cancelled"
  cost?: number
  provider_id?: string
  created_by: string
}) => {
  try {
    return await prisma.maintenance.create({
      data: {
        ...data,
        status: data.status ?? "pending",
      },
    })
  } catch (error: any) {
    throw new Error("Erro ao criar manutenção: " + error.message)
  }
}

// Busca manutenções de um imóvel
export const getMaintenanceByProperty = async (property_id: string) => {
  try {
    return await prisma.maintenance.findMany({
      where: { property_id },
      include: {
        provider: true,
        created_by_user: true,
        documents: true,
      },
      orderBy: { scheduled_date: "asc" },
    })
  } catch (error: any) {
    throw new Error("Erro ao buscar manutenções: " + error.message)
  }
}

// Adiciona documento à manutenção
export const addMaintenanceDocument = async (data: {
  maintenance_id: string
  url: string
  type: "invoice" | "photo" | "other"
}) => {
  try {
    return await prisma.maintenanceDocument.create({ data })
  } catch (error: any) {
    throw new Error(
      "Erro ao adicionar documento de manutenção: " + error.message
    )
  }
}

export default {
  createMaintenance,
  getMaintenanceByProperty,
  addMaintenanceDocument,
}
