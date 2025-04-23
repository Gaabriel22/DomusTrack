import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type PropertyStatus = "active" | "inactive" | "under_maintenance"

type Property = {
  id: string
  owner_id: string
  name: string
  address: string
  status: PropertyStatus
  created_at: Date
  updated_at: Date
}

// Cria uma nova propriedade
export const createProperty = async (data: {
  name: string
  address: string
  status: PropertyStatus
  owner_id: string
}): Promise<Property> => {
  try {
    return (await prisma.property.create({ data })) as Property
  } catch (error) {
    throw new Error(
      "Erro ao criar propriedade: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Busca uma propriedade por ID
export const getPropertyById = async (id: string): Promise<Property | null> => {
  try {
    return (await prisma.property.findUnique({ where: { id } })) as Property
  } catch (error) {
    throw new Error(
      "Erro ao buscar propriedade: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Atualiza os dados de uma propriedade
export const updateProperty = async (
  id: string,
  data: Partial<Omit<Property, "id" | "created_at" | "owner_id">>
): Promise<Property> => {
  try {
    return (await prisma.property.update({ where: { id }, data })) as Property
  } catch (error) {
    throw new Error(
      "Erro ao atualizar propriedade: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Deleta uma propriedade
export const deleteProperty = async (id: string): Promise<Property> => {
  try {
    return (await prisma.property.delete({ where: { id } })) as Property
  } catch (error) {
    throw new Error(
      "Erro ao deletar propriedade: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Lista todas as propriedades
export const listProperties = async (): Promise<Property[]> => {
  try {
    return (await prisma.property.findMany()) as Property[]
  } catch (error) {
    throw new Error(
      "Erro ao listar propriedades: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Lista propriedades por dono
export const listPropertiesByOwner = async (
  ownerId: string
): Promise<Property[]> => {
  try {
    return (await prisma.property.findMany({
      where: { owner_id: ownerId },
    })) as Property[]
  } catch (error) {
    throw new Error(
      "Erro ao listar propriedades do usuário: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

export default {
  createProperty,
  getPropertyById,
  updateProperty,
  deleteProperty,
  listProperties,
  listPropertiesByOwner,
}
