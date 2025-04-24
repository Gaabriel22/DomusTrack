import { Request, Response } from "express"
import propertyService from "../services/propertyService"

// Controlador para criar uma nova propriedade
export const createProperty = async (req: Request, res: Response) => {
  try {
    const { name, address, status, owner_id } = req.body
    const newProperty = await propertyService.createProperty({
      name,
      address,
      status,
      owner_id,
    })
    res.status(201).json(newProperty)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao criar propriedade" })
  }
}

// Controlador para atualizar uma propriedade existente
export const updateProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = req.body
    const updatedProperty = await propertyService.updateProperty(id, data)
    res.status(200).json(updatedProperty)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao atualizar propriedade" })
  }
}

// Controlador para buscar uma propriedade pelo ID
export const getPropertyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const property = await propertyService.getPropertyById(id)
    res.status(200).json(property)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao buscar propriedade" })
  }
}

// Controlador para deletar uma propriedade pelo ID
export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedProperty = await propertyService.deleteProperty(id)
    res.status(200).json(deletedProperty)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao deletar propriedade" })
  }
}

// Controlador para listar todas as propriedades
export const listProperties = async (req: Request, res: Response) => {
  try {
    const properties = await propertyService.listProperties()
    res.status(200).json(properties)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao listar propriedades" })
  }
}

// Controlador para listar propriedades de um dono específico
export const listPropertiesByOwner = async (req: Request, res: Response) => {
  try {
    const { ownerId } = req.params
    const properties = await propertyService.listPropertiesByOwner(ownerId)
    res.status(200).json(properties)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao listar propriedades do dono" })
  }
}

export default {
  createProperty,
  updateProperty,
  getPropertyById,
  deleteProperty,
  listProperties,
  listPropertiesByOwner,
}
