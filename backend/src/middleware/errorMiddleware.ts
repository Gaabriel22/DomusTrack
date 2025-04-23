import { Request, Response, NextFunction } from "express"

interface CustomError extends Error {
  statusCode?: number
  isOperational?: boolean
  details?: any
}

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.isOperational) {
    return res.status(err.statusCode || 500).json({
      status: "error",
      message: err.message,
      details: err.details || undefined,
    })
  }

  console.error(err)

  return res.status(500).json({
    status: "error",
    message: "Algo deu errado. Por favor, tente novamente mais tarde.",
  })
}

export default errorMiddleware
