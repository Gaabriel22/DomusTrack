import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import api from "../../lib/api"
import { Maintenance } from "../../types/maintenance"

const MaintenanceDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { isAuthenticated, verifyToken } = useAuth()

  const [maintenance, setMaintenance] = useState<Maintenance | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!id || Array.isArray(id)) return

      try {
        await verifyToken()

        if (!isAuthenticated) {
          router.push("/login")
          return
        }

        const response = await api.get(`/maintenances/${id}`)
        setMaintenance(response.data)
      } catch (error) {
        console.error("Erro ao buscar manutenção:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, isAuthenticated, router, verifyToken])

  if (loading) {
    return <p className="text-center mt-8">Carregando manutenção...</p>
  }

  if (!maintenance) {
    return <p className="text-center mt-8">Manutenção não encontrada.</p>
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Detalhes da Manutenção</h1>

      <div className="space-y-4 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow">
        <p>
          <span className="font-semibold">Título:</span> {maintenance.title}
        </p>
        <p>
          <span className="font-semibold">Descrição:</span>{" "}
          {maintenance.description}
        </p>
        <p>
          <span className="font-semibold">Tipo:</span> {maintenance.type}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {maintenance.status}
        </p>
        <p>
          <span className="font-semibold">Data Agendada:</span>{" "}
          {new Date(maintenance.scheduled_date).toLocaleDateString()}
        </p>
        {maintenance.cost && (
          <p>
            <span className="font-semibold">Custo:</span> R${" "}
            {maintenance.cost.toFixed(2)}
          </p>
        )}
        {maintenance.provider_id && (
          <p>
            <span className="font-semibold">Fornecedor:</span>{" "}
            {maintenance.provider_id}
          </p>
        )}
      </div>
    </div>
  )
}

export default MaintenanceDetailPage
