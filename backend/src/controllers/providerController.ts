import { Request, Response } from "express"
import providerService from "../services/providerService"

// Controlador para criar um novo provedor
export const createProvider = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, service_type, created_by } = req.body
    const newProvider = await providerService.createProvider({
      name,
      phone,
      email,
      service_type,
      created_by,
    })
    res.status(201).json(newProvider)
  } catch (error: any) {
    res.status(400).json({ message: error.message || "Erro ao criar provedor" })
  }
}

// Controlador para buscar um provedor pelo ID
export const getProviderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const provider = await providerService.getProviderById(id)
    res.status(200).json(provider)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao buscar provedor" })
  }
}

// Controlador para buscar um provedor pelo e-mail
export const getProviderByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params
    const provider = await providerService.getProviderByEmail(email)
    res.status(200).json(provider)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao buscar provedor por e-mail" })
  }
}

// Controlador para atualizar os dados de um provedor
export const updateProvider = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const data = req.body
    const updatedProvider = await providerService.updateProvider(id, data)
    res.status(200).json(updatedProvider)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao atualizar provedor" })
  }
}

// Controlador para deletar um provedor
export const deleteProvider = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedProvider = await providerService.deleteProvider(id)
    res.status(200).json(deletedProvider)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao deletar provedor" })
  }
}

// Controlador para listar todos os provedores
export const listProviders = async (req: Request, res: Response) => {
  try {
    const providers = await providerService.listProviders()
    res.status(200).json(providers)
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message || "Erro ao listar provedores" })
  }
}

export default {
  createProvider,
  getProviderById,
  getProviderByEmail,
  updateProvider,
  deleteProvider,
  listProviders,
}
