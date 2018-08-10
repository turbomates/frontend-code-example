const messages = {
  required: 'required',
  email: 'invalid email format',
}

export type Validator = (value: string | boolean) => string | null

export function requiredValidator(value: string | boolean): string | null {
  return isEmpty(value) ? messages.required : null
}

export function emailValidator(value: string): string | null {
  if (isEmpty(value)) return null
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  return re.test(value) ? null : messages.email
}

function isEmpty(value: any): boolean {
  return typeof value === 'undefined' || value === '' || value === false
}
