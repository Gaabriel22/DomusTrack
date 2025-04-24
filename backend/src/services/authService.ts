import { PrismaClient, User } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const prisma = new PrismaClient()

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

const generateToken = (user: Pick<User, "id" | "email" | "role">): string => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  }

  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error("JWT_SECRET não está definido nas variáveis de ambiente.")
  }

  const expiresIn = process.env.JWT_EXPIRES_IN
  const options: jwt.SignOptions = {
    expiresIn: (expiresIn as jwt.SignOptions["expiresIn"]) || "1h",
  }

  return jwt.sign(payload, secret, options)
}

// Cria um novo usuário
export const createUser = async (data: {
  name: string
  email: string
  password: string
  role: string
}): Promise<any> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new Error("Email já está em uso")
    }

    const hashedPassword = await hashPassword(data.password)

    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: hashedPassword,
        role: data.role as any,
      },
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Erro ao criar usuário: " + error.message)
    } else {
      throw new Error("Erro desconhecido ao criar usuário")
    }
  }
}

// Autentica o usuário e gera o JWT
export const authenticateUser = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    const isPasswordValid = await comparePassword(password, user.password_hash)

    if (!isPasswordValid) {
      throw new Error("Senha inválida")
    }

    const token = generateToken(user)

    return token
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Erro ao autenticar usuário: " + error.message)
    } else {
      throw new Error("Erro desconhecido ao autenticar usuário")
    }
  }
}

// Função para verificar o JWT
export const verifyToken = (token: string): any => {
  try {
    const secret = process.env.JWT_SECRET as string
    return jwt.verify(token, secret)
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Token inválido ou expirado")
    } else {
      throw new Error("Erro desconhecido ao verificar token")
    }
  }
}

export default {
  createUser,
  authenticateUser,
  verifyToken,
}
