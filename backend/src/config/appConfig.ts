import dotenv from "dotenv"

dotenv.config()

const appConfig = {
  port: process.env.PORT || 3001,
  apiUrl: process.env.API_URL || `http://localhost:${process.env.PORT || 3001}`,
}

export default appConfig
