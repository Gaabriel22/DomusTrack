import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

type ServiceType = "electrician" | "plumber" | "cleaning" | "general"

// Função para criar um novo provedor
export const createProvider = async (data: {
  name: string
  phone: string
  email: string
  service_type: ServiceType
  created_by: string // ID do usuário que criou o provedor
}) => {
  try {
    const provider = await prisma.provider.create({
      data,
    })
    return provider
  } catch (error) {
    throw new Error(
      "Erro ao criar provedor: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Função para buscar um provedor pelo ID
export const getProviderById = async (id: string) => {
  try {
    const provider = await prisma.provider.findUnique({
      where: { id },
    })
    return provider
  } catch (error) {
    throw new Error(
      "Erro ao buscar provedor: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Função para buscar um provedor pelo email
export const getProviderByEmail = async (email: string) => {
  try {
    const provider = await prisma.provider.findUnique({
      where: { email },
    })
    return provider
  } catch (error) {
    throw new Error(
      "Erro ao buscar provedor por email: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Função para atualizar os dados de um provedor
export const updateProvider = async (id: string, data: Partial<any>) => {
  // Use 'any' ou o tipo adequado baseado no seu modelo
  try {
    const updatedProvider = await prisma.provider.update({
      where: { id },
      data,
    })
    return updatedProvider
  } catch (error) {
    throw new Error(
      "Erro ao atualizar provedor: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Função para deletar um provedor
export const deleteProvider = async (id: string) => {
  try {
    const deletedProvider = await prisma.provider.delete({
      where: { id },
    })
    return deletedProvider
  } catch (error) {
    throw new Error(
      "Erro ao deletar provedor: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Função para listar todos os provedores
export const listProviders = async () => {
  try {
    const providers = await prisma.provider.findMany()
    return providers
  } catch (error) {
    throw new Error(
      "Erro ao listar provedores: " +
        (error instanceof Error ? error.message : "Erro desconhecido")
    )
  }
}

// Função para verificar se o email já está sendo usado por outro provedor
export const isEmailTaken = async (email: string) => {
  const provider = await prisma.provider.findUnique({
    where: { email },
  })
  return provider !== null
}

export default {
  createProvider,
  getProviderById,
  getProviderByEmail,
  updateProvider,
  deleteProvider,
  listProviders,
  isEmailTaken,
}
