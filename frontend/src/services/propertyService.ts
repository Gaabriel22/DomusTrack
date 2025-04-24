import api from "../lib/api"
import { Property } from "../types/property"
import { AxiosError } from "axios"

// Cria uma nova propriedade
export const createProperty = async (data: {
  name: string
  address: string
  status: "active" | "inactive" | "under_maintenance"
  owner_id: string
}) => {
  try {
    const response = await api.post("/properties", data)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao criar propriedade"
      )
    }
    throw new Error("Erro desconhecido ao criar propriedade")
  }
}

// Atualiza uma propriedade existente
export const updateProperty = async (id: string, data: Partial<Property>) => {
  try {
    const response = await api.put(`/properties/${id}`, data)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao atualizar propriedade"
      )
    }
    throw new Error("Erro desconhecido ao atualizar propriedade")
  }
}

// Busca uma propriedade pelo ID
export const getPropertyById = async (id: string) => {
  try {
    const response = await api.get(`/properties/${id}`)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao buscar propriedade"
      )
    }
    throw new Error("Erro desconhecido ao buscar propriedade")
  }
}

// Deleta uma propriedade pelo ID
export const deleteProperty = async (id: string) => {
  try {
    const response = await api.delete(`/properties/${id}`)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao deletar propriedade"
      )
    }
    throw new Error("Erro desconhecido ao deletar propriedade")
  }
}

// Lista todas as propriedades
export const listProperties = async () => {
  try {
    const response = await api.get("/properties")
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao listar propriedades"
      )
    }
    throw new Error("Erro desconhecido ao listar propriedades")
  }
}

// Lista propriedades de um dono específico
export const listPropertiesByOwner = async (ownerId: string) => {
  try {
    const response = await api.get(`/properties/owner/${ownerId}`)
    return response.data
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || "Erro ao listar propriedades do dono"
      )
    }
    throw new Error("Erro desconhecido ao listar propriedades do dono")
  }
}
