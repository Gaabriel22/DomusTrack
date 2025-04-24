import { Request, Response, NextFunction } from "express"
import authService from "../services/authService"

// Registra um novo usuário
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password || !role) {
      res.status(400).json({ error: "Todos os campos são obrigatórios." })
    }

    const user = await authService.createUser({ name, email, password, role })
    res.status(201).json({ message: "Usuário criado com sucesso", user })
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error: error.message || "Erro ao criar usuário" })
  }
}

// Autentica o usuário e gera o token JWT
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ error: "Email e senha são obrigatórios." })
    }

    const token = await authService.authenticateUser(email, password)
    res.status(200).json({ message: "Autenticação bem-sucedida", token })
  } catch (error: any) {
    console.error(error)
    res.status(401).json({ error: error.message || "Erro na autenticação" })
  }
}

// Verifica o JWT e retorna os dados do usuário
export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1] 

    if (!token) {
      res.status(400).json({ error: "Token não fornecido" })
    }

    const decoded = await authService.verifyToken(token as string) 
    res.status(200).json({ message: "Token válido", user: decoded })
  } catch (error: any) {
    console.error(error)
    res
      .status(401)
      .json({ error: error.message || "Token inválido ou expirado" })
  }
}

export default {
  register,
  login,
  verify,
}
