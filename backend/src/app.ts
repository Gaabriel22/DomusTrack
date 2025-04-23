import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan"

const app: Application = express()

// Middleware
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Servidor está funcionando!")
})

export default app
