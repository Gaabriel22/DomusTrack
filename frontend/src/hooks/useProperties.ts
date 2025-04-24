import { useContext } from "react"
import { PropertyContext } from "../contexts/PropertyContext"

export const useProperties = () => {
  const context = useContext(PropertyContext)

  if (!context) {
    throw new Error(
      "useProperties deve ser usado dentro de um PropertyProvider"
    )
  }

  return context
}
