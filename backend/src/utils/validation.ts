import { isEmail } from "validator" 

// Função para verificar se o email é válido
export const validateEmail = (email: string): boolean => {
  return isEmail(email)
}

// Função para verificar se o valor é um UUID válido
export const validateUUID = (uuid: string): boolean => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

// Função para verificar se o nome é válido (não vazio e sem caracteres especiais)
export const validateName = (name: string): boolean => {
  return name.trim().length > 0 && /^[a-zA-Z\s]+$/.test(name)
}

// Função para validar se a senha é forte o suficiente
export const validatePassword = (password: string): boolean => {
  // Verifica se a senha tem pelo menos 8 caracteres, uma letra maiúscula, uma minúscula e um número
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

// Função para verificar se o telefone tem um formato válido (Exemplo: (XX) XXXXX-XXXX)
export const validatePhone = (phone: string): boolean => {
  // Regex para validar telefone brasileiro
  const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/
  return phoneRegex.test(phone)
}

export default {
  validateEmail,
  validateUUID,
  validateName,
  validatePassword,
  validatePhone,
}
