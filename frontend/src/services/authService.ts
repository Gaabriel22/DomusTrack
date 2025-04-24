import { User, UserRole } from "../types/user"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export interface RegisterPayload {
  name: string
  email: string
  password: string
  role: UserRole
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}

export interface RegisterResponse {
  message: string
  user: User
}

// Registro de novo usuário
export const register = async (
  data: RegisterPayload
): Promise<RegisterResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Erro ao registrar usuário.")
  }

  return response.json()
}

// Login e armazenamento do token
export const login = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Erro ao fazer login.")
  }

  const result = await response.json()
  localStorage.setItem("token", result.token)

  const user = await verifyToken()

  return {
    message: result.message,
    token: result.token,
    user,
  }
}

// Verificação do token e retorno dos dados do usuário
export const verifyToken = async (): Promise<User> => {
  const token = localStorage.getItem("token")

  if (!token) {
    throw new Error("Token não encontrado")
  }

  const response = await fetch(`${API_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Token inválido ou expirado")
  }

  const result = await response.json()
  return result.user
}

// Logout (remove token)
export const logout = () => {
  localStorage.removeItem("token")
}
