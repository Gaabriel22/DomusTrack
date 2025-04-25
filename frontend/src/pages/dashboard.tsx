import React, { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import propertyService from "../services/propertyService"
import maintenanceService from "../services/maintenanceService"
import { Property } from "../types/property"
import { Maintenance } from "../types/maintenance"

const DashboardPage = () => {
  const { user, isAuthenticated } = useAuth()
  const [properties, setProperties] = useState<Property[] | null>(null)
  const [maintenances, setMaintenances] = useState<Maintenance[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated || !user) return

      try {
        const [propertyData, maintenanceData] = await Promise.all([
          propertyService.listPropertiesByOwner(user.id),
          maintenanceService.getMaintenanceByProperty(user.id),
        ])
        setProperties(propertyData)
        setMaintenances(maintenanceData)
      } catch (error) {
        console.error("Erro ao buscar dados do dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isAuthenticated, user])

  if (loading) {
    return (
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-32 w-full bg-muted animate-pulse rounded-2xl" />
        <div className="h-32 w-full bg-muted animate-pulse rounded-2xl" />
      </div>
    )
  }

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-2xl shadow bg-card p-4">
        <h2 className="text-lg font-semibold text-primary">Propriedades</h2>
        <p className="text-primary-foreground">
          {properties?.length ?? 0} cadastradas
        </p>
      </div>
      <div className="rounded-2xl shadow bg-card p-4">
        <h2 className="text-lg font-semibold text-primary">Manutenções</h2>
        <p className="text-primary-foreground">
          {maintenances?.length ?? 0} registradas
        </p>
      </div>
    </div>
  )
}

export default DashboardPage
