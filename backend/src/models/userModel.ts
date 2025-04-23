import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Função para criar um novo usuário
export const createUser = async (data: {
  name: string
  email: string
  password_hash: string
  role: "owner" | "tenant" | "manager" | "business" 
}) => {
  try {
    const user = await prisma.user.create({
      data,
    })
    return user
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Erro ao criar usuário: " + error.message)
    } else {
      throw new Error("Erro desconhecido ao criar usuário")
    }
  }
}

// Função para buscar um usuário pelo ID
export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })
    return user
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Erro ao buscar usuário: " + error.message)
    } else {
      throw new Error("Erro desconhecido ao buscar usuário")
    }
  }
}

// Função para buscar um usuário pelo email
export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Erro ao buscar usuário por email: " + error.message)
    } else {
      throw new Error("Erro desconhecido ao buscar usuário por email")
    }
  }
}

// Função para atualizar um usuário
export const updateUser = async (id: string, data: Partial<any>) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
    })
    return updatedUser
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Erro ao atualizar usuário: " + error.message)
    } else {
      throw new Error("Erro desconhecido ao atualizar usuário")
    }
  }
}

// Função para deletar um usuário
export const deleteUser = async (id: string) => {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id },
    })
    return deletedUser
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Erro ao deletar usuário: " + error.message)
    } else {
      throw new Error("Erro desconhecido ao deletar usuário")
    }
  }
}

// Função para listar todos os usuários
export const listUsers = async () => {
  try {
    const users = await prisma.user.findMany()
    return users
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Erro ao listar usuários: " + error.message)
    } else {
      throw new Error("Erro desconhecido ao listar usuários")
    }
  }
}

// Função para verificar se o email já existe
export const isEmailTaken = async (email: string): Promise<boolean> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })
    return user !== null
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        "Erro ao verificar se o email já está em uso: " + error.message
      )
    } else {
      throw new Error("Erro desconhecido ao verificar email")
    }
  }
}

export default {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
  listUsers,
  isEmailTaken,
}
