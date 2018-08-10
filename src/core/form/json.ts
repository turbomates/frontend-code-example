export type Choice = { value: string; label: string }

export interface CheckboxFieldJSON {
  data: boolean
  required: boolean
}

export interface InputFieldJSON {
  data: string
  required: boolean
}

export interface SelectFieldJSON {
  data: string
  required: boolean
  choices: Choice[]
}

export interface FileFieldJSON {
  file: InputFieldJSON
}
