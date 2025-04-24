import { useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "next-themes"
import Input from "../components/Input"

const LoginPage = () => {
  const { login } = useAuth()
  const { theme, setTheme } = useTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string>("")
  const router = useRouter()

  // Função de login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      router.push("/") // Redireciona para a página inicial após o login
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Erro ao fazer login")
      } else {
        setError("Erro desconhecido")
      }
    }
  }

  return (
    <div
      className={`flex min-h-screen items-center justify-center p-6 ${
        theme === "dark" ? "bg-dark" : "bg-light"
      }`}
    >
      <div className="max-w-md w-full bg-white dark:bg-dark p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-primary mb-6">
          Login
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Senha
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none"
          >
            Entrar
          </button>
        </form>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-primary text-white dark:bg-secondary"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v3m0 12v3m7.5-9h-3M3 12h3m7.5-9A9 9 0 1112 21a9 9 0 010-18z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V3m0 12v3m7.5-9h-3M3 12h3"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
