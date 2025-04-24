import { Router } from "express"
import propertyController from "../controllers/propertyController"

const router = Router()

// Rota para criar uma nova propriedade
router.post("/create", propertyController.createProperty)

// Rota para atualizar uma propriedade existente
router.put("/:id", propertyController.updateProperty)

// Rota para buscar uma propriedade pelo ID
router.get("/:id", propertyController.getPropertyById)

// Rota para deletar uma propriedade pelo ID
router.delete("/:id", propertyController.deleteProperty)

// Rota para listar todas as propriedades
router.get("/", propertyController.listProperties)

// Rota para listar propriedades de um dono específico
router.get("/owner/:ownerId", propertyController.listPropertiesByOwner)

export default router
