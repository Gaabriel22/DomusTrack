import { Router } from "express"
import providerController from "../controllers/providerController"

const router = Router()

// Rota para criar um novo provedor
router.post("/create", providerController.createProvider)

// Rota para buscar um provedor pelo ID
router.get("/:id", providerController.getProviderById)

// Rota para buscar um provedor pelo e-mail
router.get("/email/:email", providerController.getProviderByEmail)

// Rota para atualizar os dados de um provedor
router.put("/:id", providerController.updateProvider)

// Rota para deletar um provedor
router.delete("/:id", providerController.deleteProvider)

// Rota para listar todos os provedores
router.get("/", providerController.listProviders)

export default router
