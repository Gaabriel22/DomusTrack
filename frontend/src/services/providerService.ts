import api from "../lib/api"
import { Provider } from "../types/provider"
import { AxiosError } from "axios"

// Cria um novo provedor
export const createProvider = async (data: {
  name: string
  phone: string
  email: string
  service_type: "electrician" | "plumber" | "cleaning" | "general"
  created_by: string
}) => {
  try {
    const response = await api.post("/providers", data)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Erro ao criar provedor")
    }
    throw new Error("Erro desconhecido ao criar provedor")
  }
}

// Busca um provedor pelo ID
export const getProviderById = async (id: string) => {
  try {
    const response = await api.get(`/providers/${id}`)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao buscar provedor"
      )
    }
    throw new Error("Erro desconhecido ao buscar provedor")
  }
}

// Busca um provedor pelo e-mail
export const getProviderByEmail = async (email: string) => {
  try {
    const response = await api.get(`/providers/email/${email}`)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao buscar provedor por e-mail"
      )
    }
    throw new Error("Erro desconhecido ao buscar provedor por e-mail")
  }
}

// Atualiza os dados de um provedor
export const updateProvider = async (id: string, data: Partial<Provider>) => {
  try {
    const response = await api.put(`/providers/${id}`, data)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao atualizar provedor"
      )
    }
    throw new Error("Erro desconhecido ao atualizar provedor")
  }
}

// Deleta um provedor
export const deleteProvider = async (id: string) => {
  try {
    const response = await api.delete(`/providers/${id}`)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao deletar provedor"
      )
    }
    throw new Error("Erro desconhecido ao deletar provedor")
  }
}

// Lista todos os provedores
export const listProviders = async () => {
  try {
    const response = await api.get("/providers")
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao listar provedores"
      )
    }
    throw new Error("Erro desconhecido ao listar provedores")
  }
}

const providerService = {
  createProvider,
  getProviderById,
  getProviderByEmail,
  updateProvider,
  deleteProvider,
  listProviders,
}

export default providerService
