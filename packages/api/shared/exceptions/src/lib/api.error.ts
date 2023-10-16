import { HttpException, HttpStatus } from '@nestjs/common'
import { BaseApiError } from './types/base-api.error'
import { ApiErrorType } from './types/api-error-codes'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ApiErrorParams extends Omit<BaseApiError, 'message'> {}

export class ApiError extends HttpException implements ApiErrorParams {
  statusCode!: number
  type!: ApiErrorType
  meta?: Record<string, unknown>
  code?: number
  explanation?: string | undefined

  constructor(readonly message: string, params?: ApiErrorParams) {
    const statusCode = params?.statusCode || 400

    super({ message, ...params }, statusCode)

    this.message = message
    this.statusCode = statusCode
    this.code = params?.code
    this.meta = params?.meta
    this.explanation = params?.explanation
    this.type = params?.type || 'api_error'
  }

  toObject(): ApiErrorParams {
    return {
      code: this.code,
      explanation: this.explanation,
      meta: this.meta,
      statusCode: this.statusCode,
      type: this.type,
    }
  }
}
