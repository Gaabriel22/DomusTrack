import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"

interface User {
    name: string,
    role: string
}

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User| null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const router = useRouter()

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

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" passHref>
            <a className="text-2xl font-bold">DomusTrack</a>
          </Link>
          <div className="flex space-x-4">
            <Link href="/" passHref>
              <a className="hover:bg-primary-dark px-3 py-2 rounded-md">Home</a>
            </Link>
            <Link href="/properties" passHref>
              <a className="hover:bg-primary-dark px-3 py-2 rounded-md">
                Propriedades
              </a>
            </Link>
            <Link href="/maintenances" passHref>
              <a className="hover:bg-primary-dark px-3 py-2 rounded-md">
                Manutenções
              </a>
            </Link>
            {isAuthenticated && user?.role === "admin" && (
              <Link href="/users" passHref>
                <a className="hover:bg-primary-dark px-3 py-2 rounded-md">
                  Usuários
                </a>
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
              <Link href="/login" passHref>
                <a className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Login
                </a>
              </Link>
              <Link href="/register" passHref>
                <a className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                  Registrar
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
