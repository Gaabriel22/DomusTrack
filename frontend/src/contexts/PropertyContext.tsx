import React, { createContext, useState, useContext, ReactNode } from "react"
import propertyService from "../services/propertyService"
import { Property } from "../types/property"

interface PropertyContextType {
  properties: Property[]
  isLoading: boolean
  createProperty: (data: {
    name: string
    address: string
    status: "active" | "inactive" | "under_maintenance"
    owner_id: string
  }) => Promise<void>
  updateProperty: (id: string, data: Partial<Property>) => Promise<void>
  getPropertyById: (id: string) => Promise<void>
  deleteProperty: (id: string) => Promise<void>
  listProperties: () => Promise<void>
  listPropertiesByOwner: (ownerId: string) => Promise<void>
}

const PropertyContext = createContext<PropertyContextType | undefined>(
  undefined
)

interface PropertyProviderProps {
  children: ReactNode
}

// Provider para o contexto de propriedades
export const PropertyProvider = ({ children }: PropertyProviderProps) => {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Função para criar uma nova propriedade
  const createProperty = async (data: {
    name: string
    address: string
    status: "active" | "inactive" | "under_maintenance"
    owner_id: string
  }) => {
    try {
      await propertyService.createProperty(data)
      await listProperties() // Atualiza a lista de propriedades após criação
    } catch (error) {
      console.error("Erro ao criar propriedade:", error)
    }
  }

  // Função para atualizar uma propriedade
  const updateProperty = async (id: string, data: Partial<Property>) => {
    try {
      await propertyService.updateProperty(id, data)
      await listProperties() // Atualiza a lista de propriedades após atualização
    } catch (error) {
      console.error("Erro ao atualizar propriedade:", error)
    }
  }

  // Função para obter uma propriedade pelo ID
  const getPropertyById = async (id: string) => {
    setIsLoading(true)
    try {
      const property = await propertyService.getPropertyById(id)
      setProperties([property]) // Armazena a propriedade individual
    } catch (error) {
      console.error("Erro ao buscar propriedade:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para deletar uma propriedade
  const deleteProperty = async (id: string) => {
    try {
      await propertyService.deleteProperty(id)
      setProperties((prevProperties) =>
        prevProperties.filter((property) => property.id !== id)
      )
    } catch (error) {
      console.error("Erro ao deletar propriedade:", error)
    }
  }

  // Função para listar todas as propriedades
  const listProperties = async () => {
    setIsLoading(true)
    try {
      const propertiesData = await propertyService.listProperties()
      setProperties(propertiesData)
    } catch (error) {
      console.error("Erro ao listar propriedades:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para listar propriedades de um dono específico
  const listPropertiesByOwner = async (ownerId: string) => {
    setIsLoading(true)
    try {
      const propertiesData = await propertyService.listPropertiesByOwner(
        ownerId
      )
      setProperties(propertiesData)
    } catch (error) {
      console.error("Erro ao listar propriedades do dono:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PropertyContext.Provider
      value={{
        properties,
        isLoading,
        createProperty,
        updateProperty,
        getPropertyById,
        deleteProperty,
        listProperties,
        listPropertiesByOwner,
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

// Hook para acessar o contexto de propriedades
export const useProperty = (): PropertyContextType => {
  const context = useContext(PropertyContext)
  if (!context) {
    throw new Error("useProperty deve ser usado dentro de um PropertyProvider")
  }
  return context
}
