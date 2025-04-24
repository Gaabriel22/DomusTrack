import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react"
import {
  register,
  login,
  verifyToken,
  logout as logoutService,
} from "../services/authService"
import { User, UserRole } from "../types/user"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => Promise<void>
  verifyToken: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

// Provider do contexto de autenticação
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  // Função para registrar um novo usuário
  const handleRegister = async (
    name: string,
    email: string,
    password: string,
    role: UserRole
  ) => {
    try {
      await register({ name, email, password, role })
    } catch (error) {
      console.error("Erro ao registrar usuário:", error)
    }
  }

  // Função para realizar login
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await login({ email, password })
      setUser(response.user)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Erro ao fazer login:", error)
    }
  }

  // Função para verificar o token e definir o usuário
  const handleVerifyToken = async () => {
    try {
      const user = await verifyToken()
      setUser(user)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("Erro ao verificar token:", error)
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  // Função para logout
  const handleLogout = () => {
    logoutService()
    setUser(null)
    setIsAuthenticated(false)
  }

  // Verifica o token ao carregar o componente
  useEffect(() => {
    handleVerifyToken()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login: handleLogin,
        register: handleRegister,
        verifyToken: handleVerifyToken,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Hook para acessar o contexto de autenticação
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
