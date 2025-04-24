import providerModel from "../models/providerModel"

type ServiceType = "electrician" | "plumber" | "cleaning" | "general"

// Tipo DTO para criação de provedor
type CreateProviderDTO = {
  name: string
  phone: string
  email: string
  service_type: ServiceType
  created_by: string
}

// Tipo DTO para atualização de provedor
type UpdateProviderDTO = Partial<CreateProviderDTO>

// Cria um novo provedor
export const createProvider = async (data: CreateProviderDTO) => {
  // Validação de dados obrigatórios
  if (
    !data.name ||
    !data.phone ||
    !data.email ||
    !data.service_type ||
    !data.created_by
  ) {
    throw new Error("Todos os campos obrigatórios devem ser fornecidos.")
  }

  // Verifica se o e-mail já está sendo utilizado
  const emailTaken = await providerModel.isEmailTaken(data.email)
  if (emailTaken) {
    throw new Error("Este e-mail já está sendo usado por outro provedor.")
  }

  return await providerModel.createProvider(data)
}

// Busca um provedor pelo ID
export const getProviderById = async (id: string) => {
  if (!id) {
    throw new Error("ID do provedor é obrigatório.")
  }
  return await providerModel.getProviderById(id)
}

// Busca um provedor pelo e-mail
export const getProviderByEmail = async (email: string) => {
  if (!email) {
    throw new Error("E-mail do provedor é obrigatório.")
  }
  return await providerModel.getProviderByEmail(email)
}

// Atualiza os dados de um provedor
export const updateProvider = async (id: string, data: UpdateProviderDTO) => {
  if (!id) {
    throw new Error("ID do provedor é obrigatório.")
  }

  if (data.email) {
    const emailTaken = await providerModel.isEmailTaken(data.email)
    if (emailTaken) {
      throw new Error("Este e-mail já está sendo usado por outro provedor.")
    }
  }

  return await providerModel.updateProvider(id, data)
}

// Deleta um provedor
export const deleteProvider = async (id: string) => {
  if (!id) {
    throw new Error("ID do provedor é obrigatório.")
  }
  return await providerModel.deleteProvider(id)
}

// Lista todos os provedores
export const listProviders = async () => {
  return await providerModel.listProviders()
}

export default {
  createProvider,
  getProviderById,
  getProviderByEmail,
  updateProvider,
  deleteProvider,
  listProviders,
}
