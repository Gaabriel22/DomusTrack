import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

// Garantindo que a SECRET_KEY seja uma string
const SECRET_KEY = process.env.JWT_SECRET

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET não configurado em .env")
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res
      .status(401)
      .json({ message: "Token não encontrado, autorização negada." })
  }

  try {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido ou expirado." })
      }

      req.user = decoded
      next()
    })
  } catch (error) {
    return res.status(500).json({ message: "Erro ao verificar token." })
  }
}
