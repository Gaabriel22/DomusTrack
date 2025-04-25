import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuth } from "../../hooks/useAuth"
import propertyService from "../../services/propertyService"
import { Property } from "../../types/property"

const PropertyDetailPage = () => {
  const router = useRouter()
  const { id } = router.query
  const { isAuthenticated } = useAuth()
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated || !id || typeof id !== "string") return

    const fetchProperty = async () => {
      try {
        const data = await propertyService.getPropertyById(id)
        setProperty(data)
      } catch (error) {
        console.error("Erro ao buscar propriedade:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperty()
  }, [id, isAuthenticated])

  if (!isAuthenticated) {
    return (
      <p className="p-4">
        Você precisa estar autenticado para ver esta página.
      </p>
    )
  }

  if (loading) {
    return (
      <div className="p-4 animate-pulse text-muted">
        Carregando detalhes da propriedade...
      </div>
    )
  }

  if (!property) {
    return (
      <div className="p-4 text-destructive">Propriedade não encontrada.</div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-background shadow rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">{property.name}</h1>
      <p>
        <strong>Endereço:</strong> {property.address}
      </p>
      <p>
        <strong>Status:</strong> {property.status}
      </p>
      <p>
        <strong>ID do Dono:</strong> {property.owner_id}
      </p>
    </div>
  )
}

export default PropertyDetailPage
