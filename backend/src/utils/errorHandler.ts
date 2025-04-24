export class ValidationError extends Error {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = 400 // Bad Request
    this.name = "ValidationError"
  }
}

export class NotFoundError extends Error {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = 404 // Not Found
    this.name = "NotFoundError"
  }
}

export class InternalServerError extends Error {
  statusCode: number
  constructor(message: string) {
    super(message)
    this.statusCode = 500 // Internal Server Error
    this.name = "InternalServerError"
  }
}

// Função para tratamento geral de erros
export const handleError = (error: Error, res: any) => {
  if (error instanceof ValidationError || error instanceof NotFoundError) {
    return res.status(error.statusCode).json({
      message: error.message,
    })
  }
  // Para outros tipos de erro (geralmente server errors)
  return res.status(500).json({
    message: "Erro interno no servidor. Tente novamente mais tarde.",
  })
}
