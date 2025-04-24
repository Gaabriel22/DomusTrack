import { Request, Response } from "express"
import maintenanceService from "../services/maintenanceService"

// Cria uma nova manutenção
export const createMaintenance = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const maintenance = await maintenanceService.createMaintenance(data)

    return res.status(201).json(maintenance)
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      error: error instanceof Error ? error.message : "Erro desconhecido",
    })
  }
}

// Lista manutenções de uma propriedade
export const getMaintenanceByProperty = async (req: Request, res: Response) => {
  try {
    const propertyId = req.params.propertyId

    const maintenances = await maintenanceService.getMaintenanceByProperty(
      propertyId
    )

    return res.status(200).json(maintenances)
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      error: error instanceof Error ? error.message : "Erro desconhecido",
    })
  }
}

// Adiciona um documento a uma manutenção
export const addMaintenanceDocument = async (req: Request, res: Response) => {
  try {
    const data = req.body

    const document = await maintenanceService.addMaintenanceDocument(data)

    return res.status(201).json(document)
  } catch (error) {
    console.error(error)
    return res.status(400).json({
      error: error instanceof Error ? error.message : "Erro desconhecido",
    })
  }
}
