import { Router } from "express"
import * as maintenanceController from "../controllers/maintenanceController"

const router = Router()

// Rota para criar uma nova manutenção
router.post("/create", maintenanceController.createMaintenance)

// Rota para listar as manutenções de uma propriedade
router.get("/:propertyId", maintenanceController.getMaintenanceByProperty)

// Rota para adicionar um documento a uma manutenção
router.post(
  "/:maintenanceId/documents",
  maintenanceController.addMaintenanceDocument
)

export default router
