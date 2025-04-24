import React, { useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../hooks/useAuth"
import { useTheme } from "next-themes"
import Input from "../components/Input"
import { UserRole } from "../types/user"

const RegisterPage = () => {
  const { register } = useAuth()
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("user" as UserRole)
  const [error, setError] = useState<string>("")
  const [success, setSuccess] = useState<string>("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register(name, email, password, role)
      setSuccess("Usuário registrado com sucesso!")
      setError("")
      router.push("/login") // Redireciona após registro
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao registrar usuário.")
      } else {
        setSuccess("")
      }
    }
  }

  return (
    <div
      className={`flex min-h-screen items-center justify-center p-6 ${
        theme === "dark" ? "bg-zinc-900" : "bg-zinc-100"
      }`}
    >
      <div className="max-w-md w-full bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center text-primary mb-6">
          Criar Conta
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Nome
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Senha
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Tipo de Conta
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="w-full p-2 border rounded-lg bg-white dark:bg-zinc-700 dark:text-white"
            >
              <option value="user">Usuário</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Registrar
          </button>
        </form>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-primary text-white dark:bg-secondary"
          >
            {theme === "dark" ? "☀️ Claro" : "🌙 Escuro"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
