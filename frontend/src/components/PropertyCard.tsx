import React from "react"
import { Property } from "../types/property"
import { useRouter } from "next/router"

interface PropertyCardProps {
  property: Property
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/property/${property.id}`)
  }

  const getStatusClass = (
    status: "active" | "inactive" | "under_maintenance"
  ) => {
    // Aqui tratamos diretamente os 3 status válidos
    switch (status) {
      case "active":
        return "bg-green-500 text-white" // Ativo
      case "inactive":
        return "bg-muted text-white" // Inativo
      case "under_maintenance":
        return "bg-yellow-500 text-white" // Em manutenção
      default:
        return "bg-gray-400 text-white" // Default
    }
  }

  return (
    <div
      className="bg-card rounded-lg shadow-lg p-4 max-w-sm w-full cursor-pointer hover:shadow-xl transition-shadow duration-200"
      onClick={handleClick}
    >
      <h3 className="text-lg font-semibold text-primary">{property.name}</h3>
      <p className="text-sm text-mutedForeground">{property.address}</p>
      <div className="mt-2 flex items-center justify-between">
        <span
          className={`text-xs font-bold py-1 px-2 rounded ${getStatusClass(
            property.status
          )}`}
        >
          {property.status.replace("_", " ").toUpperCase()}
        </span>
        <span className="text-sm text-mutedForeground">ID: {property.id}</span>
      </div>
    </div>
  )
}

export default PropertyCard
