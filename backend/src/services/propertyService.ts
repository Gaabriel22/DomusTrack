import propertyModel from "../models/propertyModel"

type CreatePropertyDTO = {
  name: string
  address: string
  status: "active" | "inactive" | "under_maintenance"
  owner_id: string
}

type UpdatePropertyDTO = Partial<{
  name: string
  address: string
  status: "active" | "inactive" | "under_maintenance"
}>

//  Cria uma nova propriedade.
export const createProperty = async (data: CreatePropertyDTO) => {
  return await propertyModel.createProperty(data)
}

// Atualiza uma propriedade existente.
export const updateProperty = async (id: string, data: UpdatePropertyDTO) => {
  return await propertyModel.updateProperty(id, data)
}

// Busca uma propriedade pelo ID.
export const getPropertyById = async (id: string) => {
  const property = await propertyModel.getPropertyById(id)
  if (!property) {
    throw new Error("Propriedade não encontrada")
  }
  return property
}

// Deleta uma propriedade pelo ID.
export const deleteProperty = async (id: string) => {
  return await propertyModel.deleteProperty(id)
}

// Lista todas as propriedades.
export const listProperties = async () => {
  return await propertyModel.listProperties()
}

// Lista propriedades de um dono específico.
export const listPropertiesByOwner = async (ownerId: string) => {
  return await propertyModel.listPropertiesByOwner(ownerId)
}

export default {
  createProperty,
  updateProperty,
  getPropertyById,
  deleteProperty,
  listProperties,
  listPropertiesByOwner,
}
