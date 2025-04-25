import React from "react"
import { Maintenance } from "../types/maintenance"
import { useRouter } from "next/router"
import { useTheme } from "next-themes"

type MaintenanceStatus = "pending" | "in_progress" | "done"

const statusColors: Record<MaintenanceStatus, string> = {
  pending: "bg-yellow-500", // ou bg-yellow-400 para dark
  in_progress: "bg-blue-500", // ou bg-blue-400 para dark
  done: "bg-green-500", // ou bg-green-400 para dark
}

interface MaintenanceCardProps {
  maintenance: Maintenance
}

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({ maintenance }) => {
  const router = useRouter()
  const { theme } = useTheme()

  const handleClick = () => {
    router.push(`/maintenance/${maintenance.id}`)
  }

  // Definindo a cor de fundo dependendo do tema
  const cardBgColor = theme === "dark" ? "bg-gray-800" : "bg-white"
  const cardTextColor = theme === "dark" ? "text-white" : "text-gray-900"

  return (
    <div
      className={`rounded-lg shadow-lg p-4 max-w-sm w-full cursor-pointer hover:shadow-xl transition-shadow duration-200 ${cardBgColor}`}
      onClick={handleClick}
    >
      <h3 className={`text-lg font-semibold ${cardTextColor}`}>
        {maintenance.title}
      </h3>
      <p
        className={`text-sm ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {maintenance.description}
      </p>
      <div className="mt-2 flex items-center justify-between">
        <span
          className={`text-xs font-bold py-1 px-2 rounded ${
            statusColors[maintenance.status as MaintenanceStatus]
          }`}
        >
          {maintenance.status.replace("_", " ").toUpperCase()}
        </span>
        <span
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Agendada para:{" "}
          {new Date(maintenance.scheduled_date).toLocaleDateString()}
        </span>
      </div>
      <div className="mt-2 flex items-center">
        <span
          className={`text-sm ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Tipo: {maintenance.type}
        </span>
      </div>
    </div>
  )
}

export default MaintenanceCard
