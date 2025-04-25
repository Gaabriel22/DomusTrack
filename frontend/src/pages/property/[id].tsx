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
      <div className="p-4 text-center text-sm text-muted-foreground">
        Você precisa estar autenticado para ver esta página.
      </div>
    )
  }

  if (loading) {
    return (
      <div className="p-4 animate-pulse text-muted-foreground text-center">
        Carregando detalhes da propriedade...
      </div>
    )
  }

  if (!property) {
    return (
      <div className="p-4 text-center text-sm text-destructive">
        Propriedade não encontrada.
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-card text-card-foreground rounded-2xl shadow space-y-4">
      <h1 className="text-2xl font-bold">Detalhes da Propriedade</h1>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Nome:</span> {property.name}
        </p>
        <p>
          <span className="font-semibold">Endereço:</span> {property.address}
        </p>
        <p>
          <span className="font-semibold">Status:</span> {property.status}
        </p>
        <p>
          <span className="font-semibold">ID do Dono:</span> {property.owner_id}
        </p>
      </div>
    </div>
  )
}

export default PropertyDetailPage
