import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan"

// Importando as rotas
import authRoutes from "./routes/authRoutes"
import maintenanceRoutes from "./routes/maintenanceRoutes"
import notificationRoutes from "./routes/notificationRoutes"
import propertyRoutes from "./routes/propertyRoutes"
import providerRoutes from "./routes/providerRoutes"

const app: Application = express()

// Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

// Usando as rotas
app.use("/api/auth", authRoutes)
app.use("/api/maintenance", maintenanceRoutes)
app.use("/api/notifications", notificationRoutes)
app.use("/api/properties", propertyRoutes)
app.use("/api/providers", providerRoutes)

export default app
