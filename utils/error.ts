import createError from 'http-errors'

function isHttpError(error: unknown): error is createError.HttpError {
  return (error as createError.HttpError).status !== undefined
}

export function getTypedError(error: unknown) {
  if (isHttpError(error)) return error

  return new createError.InternalServerError('Internal Server Error')
}
