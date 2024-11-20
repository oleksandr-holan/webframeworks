import type { IUser } from '@/models/User'

type ValidatorFunction = (value: string) => boolean

interface ValidationRule {
  validator: ValidatorFunction
  message: string
}

export type ValidationRules = {
  [K in keyof IUser]: ValidationRule[]
}
