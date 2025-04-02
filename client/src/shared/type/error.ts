export type ErrorResponse<T> = {
  status: number
  data: {
    message: string
    errors: T
  }
}
