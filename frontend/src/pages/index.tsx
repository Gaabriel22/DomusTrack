import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import maintenanceService from "../services/maintenanceService"
import propertyService from "../services/propertyService"
import { Maintenance } from "../types/maintenance"
import { Property } from "../types/property"
import Button from "../components/Button" // Importando seu componente Button

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth()
  const [maintenances, setMaintenances] = useState<Maintenance[]>([])
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      setLoading(true)
      try {
        // Carregar as propriedades do usuário
        const userProperties: Property[] =
          await propertyService.listPropertiesByOwner(user.id)
        setProperties(userProperties)

        // Carregar as manutenções das propriedades
        const maintenancesData = await Promise.all(
          userProperties.map((property) =>
            maintenanceService.getMaintenanceByProperty(property.id)
          )
        )
        setMaintenances(maintenancesData.flat())
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated) {
      fetchData()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated, user])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-background text-foreground dark:text-foreground transition-all">
        <h1 className="text-4xl font-bold text-primary">
          Bem-vindo ao DomusTrack
        </h1>
        <p className="mt-4 text-lg text-secondary">
          Gestão de manutenção com cuidado e organização.
        </p>
        <div className="mt-6 flex space-x-4">
          <Button href="/register" variant="primary" size="medium">
            Registro
          </Button>
          <Button href="/login" variant="secondary" size="medium">
            Login
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <h1 className="text-2xl font-semibold text-primary">Dashboard</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <section className="mt-6">
            <h2 className="text-xl font-semibold text-primary">Propriedades</h2>
            {properties.length === 0 ? (
              <p className="text-gray-500">
                Você não tem propriedades registradas.
              </p>
            ) : (
              <ul>
                {properties.map((property) => (
                  <li
                    key={property.id}
                    className="py-4 border-b border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-lg font-medium text-secondary">
                      {property.name}
                    </h3>
                    <p>Status: {property.status}</p>
                    <p>Endereço: {property.address}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="mt-6">
            <h2 className="text-xl font-semibold text-primary">
              Manutenções Recentes
            </h2>
            {maintenances.length === 0 ? (
              <p className="text-gray-500">
                Você não tem manutenções registradas.
              </p>
            ) : (
              <ul>
                {maintenances.map((maintenance) => (
                  <li
                    key={maintenance.id}
                    className="py-4 border-b border-gray-200 dark:border-gray-700"
                  >
                    <h3 className="text-lg font-medium text-secondary">
                      {maintenance.title}
                    </h3>
                    <p>Status: {maintenance.status}</p>
                    <p>Tipo: {maintenance.type}</p>
                    <p>
                      Data agendada:{" "}
                      {new Date(
                        maintenance.scheduled_date
                      ).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  )
}

export default Dashboard
