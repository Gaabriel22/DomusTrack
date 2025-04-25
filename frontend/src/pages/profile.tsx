import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { User } from "../types/user"
import { updateUser } from "../services/authService"

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth()
  const [name, setName] = useState<string>(user?.name || "")
  const [email, setEmail] = useState<string>(user?.email || "")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirecionar para login caso não esteja autenticado
      window.location.href = "/login"
    }
  }, [isAuthenticated])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      const updatedUser: User = {
        id: user!.id,
        name,
        email,
        password_hash: user!.password_hash,
        role: user!.role,
        created_at: user!.created_at,
        updated_at: new Date().toISOString(),
        properties: user!.properties,
        maintenances: user!.maintenances,
        notifications: user!.notifications,
        user_access: user!.user_access,
        Provider: user!.Provider,
      }

      await updateUser(updatedUser) // Atualiza as informações do usuário via serviço
      alert("Perfil atualizado com sucesso!")
    } catch (err) {
      setError("Erro ao atualizar perfil.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Editar Perfil</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-semibold">
            Nome
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Deixe em branco para não alterar"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 bg-blue-600 text-white rounded-md ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Atualizando..." : "Salvar alterações"}
        </button>
      </form>
    </div>
  )
}

export default ProfilePage
