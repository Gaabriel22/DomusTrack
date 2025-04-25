import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useTheme } from "next-themes"

interface User {
  name: string
  role: string
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const router = useRouter()
  const { theme } = useTheme()

  // Função para buscar o usuário autenticado
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("authToken")
      if (token) {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (response.ok) {
          setUser(data.user)
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      }
    } catch (error) {
      console.error("Erro ao verificar token:", error)
      setIsAuthenticated(false)
    }
  }

  // Efeito para verificar se o usuário está autenticado
  useEffect(() => {
    fetchUser()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsAuthenticated(false)
    setUser(null)
    router.push("/login") // Redireciona para a página de login
  }

  // Cores ajustadas para o tema
  const navbarBg = theme === "dark" ? "bg-gray-800" : "bg-primary"
  const navbarText = theme === "dark" ? "text-white" : "text-white"
  const hoverBg =
    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-primary-dark"

  return (
    <nav className={`${navbarBg} ${navbarText} shadow-md`}>
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-2xl font-bold">
            DomusTrack
          </Link>
          <div className="flex space-x-4">
            <Link href="/" className={`px-3 py-2 rounded-md ${hoverBg}`}>
              Home
            </Link>
            <Link
              href="/properties"
              className={`px-3 py-2 rounded-md ${hoverBg}`}
            >
              Propriedades
            </Link>
            <Link
              href="/maintenances"
              className={`px-3 py-2 rounded-md ${hoverBg}`}
            >
              Manutenções
            </Link>
            {isAuthenticated && user?.role === "admin" && (
              <Link href="/users" className={`px-3 py-2 rounded-md ${hoverBg}`}>
                Usuários
              </Link>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-lg">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Registrar
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
