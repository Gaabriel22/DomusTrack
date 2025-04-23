import app from "./app" 
import appConfig from "./config/appConfig" 

const PORT = appConfig.port 

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
