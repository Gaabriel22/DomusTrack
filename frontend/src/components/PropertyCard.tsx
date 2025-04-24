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

  return (
    <div
      className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full cursor-pointer hover:shadow-xl transition-shadow duration-200"
      onClick={handleClick}
    >
      <h3 className="text-lg font-semibold text-primary">{property.name}</h3>
      <p className="text-sm text-gray-600">{property.address}</p>
      <div className="mt-2 flex items-center justify-between">
        <span
          className={`text-xs font-bold py-1 px-2 rounded ${
            property.status === "active"
              ? "bg-green-500 text-white"
              : property.status === "inactive"
              ? "bg-gray-500 text-white"
              : "bg-yellow-500 text-white"
          }`}
        >
          {property.status.replace("_", " ").toUpperCase()}
        </span>
        <span className="text-sm text-gray-500">ID: {property.id}</span>
      </div>
    </div>
  )
}

export default PropertyCard
